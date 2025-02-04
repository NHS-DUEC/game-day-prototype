const fs = require("fs");
const readline = require("readline");
const path = require("path");
const glob = require("glob");

const templateGlob = "../**/*.cshtml";
const commentMarker = "@* template-debug *@";
const debugCommentMarkerRegex = /^.*@\* template-debug \*@.*$/;

function stripBOM(string) {
  if (string.charCodeAt(0) === 0xfeff) {
    return string.slice(1);
  }

  return string;
}

async function processFile(file) {
  console.log(`Processing ${file}`);
  const fileStream = fs.createReadStream(file);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  const viewPath = path.relative("../", file);

  if (
    // Don't inject debug comments into the debug templates
    viewPath.indexOf("_ViewImports") !== -1 ||
    viewPath.indexOf("_ViewStart") !== -1 ||
    viewPath.indexOf("_TemplateDebug") !== -1 ||
    viewPath.indexOf("_OutcomeDebugInfo") !== -1
  ) {
    return;
  }

  let outputLines = [];

  // eslint-disable-next-line  no-restricted-syntax
  for await (const line of rl) {
    // Add all lines to the output, unless they are one of out previously generated debug markers
    if (!line.match(debugCommentMarkerRegex)) {
      // Strip any Byte Order Marks as we go since our manipulation might mean they end up on line 2
      // We'll re-add a BOM when we write the file
      outputLines.push(stripBOM(line));
    }
  }

  let startDebugComment;
  let endDebugComment;

  if (file.indexOf("NHS111.Web/") !== -1) {
    // Old .Net syntax
    startDebugComment = `${commentMarker} @Html.Partial("_TemplateDebugStart", new ViewDataDictionary() { { "ViewPath", "${viewPath}" }, { "IsLayout", ${
      viewPath.indexOf("_Layout") !== -1
    } } })`;
    endDebugComment = `${commentMarker} @Html.Partial("_TemplateDebugEnd", new ViewDataDictionary() { { "ViewPath", "${viewPath}" }, { "IsLayout", ${
      viewPath.indexOf("_Layout") !== -1
    } } })`;
  } else {
    // .Net Core syntax
    startDebugComment = `${commentMarker} @Html.Partial("_TemplateDebugStart", new ViewDataDictionary(ViewData) { { "ViewPath", "${viewPath}" }, { "IsLayout", ${
      viewPath.indexOf("_Layout") !== -1
    } } })`;
    endDebugComment = `${commentMarker} @Html.Partial("_TemplateDebugEnd", new ViewDataDictionary(ViewData) { { "ViewPath", "${viewPath}" }, { "IsLayout", ${
      viewPath.indexOf("_Layout") !== -1
    } } })`;
  }

  // Inject our debug lines at the start and end
  outputLines.unshift(startDebugComment);
  outputLines.push(endDebugComment);

  // Ensure there's a blank newline at the end of the file
  if (outputLines.lastItem !== "") {
    outputLines.push("");
  }

  // And write the file, making sure to re-add the BOM
  fs.writeFile(
    file,
    "\ufeff" + outputLines.join("\r\n"),
    { encoding: "utf8" },
    (err) => {
      if (err) {
        throw err;
      }
    }
  );
}

async function processTemplates() {
  const promises = [];

  console.log("Searching for templates");
  glob(templateGlob, (err, files) => {
    if (err) {
      throw err;
    }

    files.forEach((file) => {
      promises.push(
        new Promise((resolve, reject) => {
          processFile(file);
        })
      );
    });
  });

  return Promise.all(promises);
}

processTemplates();

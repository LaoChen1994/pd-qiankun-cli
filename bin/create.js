#!/usr/bin/env node
var program = require("commander");
var inquirer = require("inquirer");
var path = require("path");
var fs = require("fs");
var handler = require("handlebars");
var glob = require("glob");

let chalk = null;
const SUPPORT_TEMPLATE = {
  vue3: "Vue 3",
  // vueTsx: "Vue 3 + TSX",
  reactTs: "React + TS",
};

const SUPPORT_TYPE = {
  Qiankun: "Qian kun Spa",
  Original: "Spa 模板",
};

function genPromotItem(name, message, type = "input", opts = {}) {
  return {
    name,
    type,
    message,
    ...opts,
  };
}

async function notify(type, message) {
  if (!chalk) {
    chalk = (await import("chalk")).default;
  }

  const log = console.log;

  switch (type) {
    case "success":
      log(chalk.green(message));
      break;
    case "fail":
      log(chalk.red(message));
      break;
    case "warn":
      log(chalk.yellow(message));
      break;
    default:
      break;
  }
}

async function initParams() {
  // 命令行参数和query参数合并
  let opts = program
    .version("0.1.0")
    .helpOption("-h, --HELP")
    .option("-t, --template <type>", "use spa template")
    .option("-n, --name <type>", "project name")
    .option(
      "-T, --type <type>",
      "template type (qiankun micro app or original app)"
    )
    .option("-P --port <number>", "the port of the server is working on")
    .parse(process.argv)
    .opts();

  const queryItems = {
    name: genPromotItem("name", "请输入工程名"),
    template: genPromotItem("template", "请选择子应用模板", "list", {
      choices: Object.keys(SUPPORT_TEMPLATE).map((item) => ({
        name: SUPPORT_TEMPLATE[item],
        value: item,
      })),
    }),
    type: genPromotItem("type", "请选择子应用模板", "list", {
      choices: Object.keys(SUPPORT_TYPE).map((item) => ({
        name: SUPPORT_TYPE[item],
        value: item,
      })),
    }),
    port: genPromotItem("port", "请输入启动服务的端口", "number"),
  };

  const optKeys = Object.keys(opts);
  const promots = {};

  Object.keys(queryItems).forEach((key) => {
    if (!optKeys.includes(key)) {
      promots[key] = queryItems[key];
    }
  });

  const queryOpts = await inquirer.prompt(Object.values(promots));

  return { ...queryOpts, ...opts };
}

function checkUserParams(opts) {
  // 参数校验
  if (!opts.name || !opts.template) {
    notify("fail", "非有效的参数，name不能为空");
    return;
  }

  if (!opts.template) {
    notify("fail", "选择模板");
    return;
  } else if (!Object.keys(SUPPORT_TEMPLATE).includes(opts.template)) {
    notify("fail", "不支持的模板类型");
    return;
  }

  return true;
}

function generator(opts) {
  const realPath = process.cwd();
  const renderTypeTemp =
    opts.template.indexOf("vue") !== -1
      ? "vue"
      : opts.template.indexOf("react") !== -1
      ? "react"
      : "";

  // @todo 这里需要添加一个判断是否文件夹下面为空的逻辑
  if (!renderTypeTemp) {
    notify("fail", "不支持的模板选项");
    return;
  }

  RenderTool(realPath, opts);
}

const getTemplateFiles = (templatePath) => {
  const tempConfigJSON =
    fs.readFileSync(path.resolve(templatePath, "template.json")).toString() ||
    "{}";

  const { template } = JSON.parse(tempConfigJSON);

  return template || [];
};

const createDir = (path) => fs.mkdirSync(path);

const globalTemplateByOpts = (
  opts,
  handler = {
    dirHandler: null,
    fileHandler: null,
  }
) => {
  const { template: templateType, type: useType } = opts;
  const templatePath = path.resolve(__dirname, `../template/${templateType}`);
  const { dirHandler, fileHandler } = handler;

  return new Promise((res, rej) => {
    glob(templatePath + "/**/*", {}, (err, files) => {
      const fileList = [];
      const dirList = [];

      if (err) rej(err);

      files.forEach((filePath) => {
        const stat = fs.statSync(filePath);
        const relativePath = filePath.split(templateType)[1].slice(1);

        if (useType !== "QianKun" && filePath.includes("public-path")) {
        } else if (stat.isDirectory()) {
          dirList.push(relativePath);
          if (dirHandler) dirHandler(relativePath);
        } else {
          fileList.push(relativePath);
          if (fileHandler) fileHandler(relativePath);
        }
      });

      res({ fileList, dirList });
    });
  });
};

async function RenderTool(genPath, opts) {
  const { template: templateType } = opts;
  const templatePath = path.resolve(__dirname, `../template/${templateType}`);
  const template = getTemplateFiles(templatePath);

  const { fileList } = await globalTemplateByOpts(opts, {
    dirHandler: (relativePath) => createDir(path.join(genPath, relativePath)),
  });

  for (let index = 0; index < fileList.length; index++) {
    const relativePath = fileList[index];
    const genAbsolutePath = path.join(genPath, relativePath);
    const tempAbsolutePath = path.join(templatePath, relativePath);

    if (relativePath.indexOf("template.json") !== -1) {
      continue;
    }

    if (template.includes(relativePath)) {
      const template = fs.readFileSync(tempAbsolutePath).toString();

      const rlt = handler.compile(template)({
        ...opts,
        isQiankun: opts.type === SUPPORT_TYPE.Qiankun,
      });

      fs.writeFileSync(genAbsolutePath, rlt);
    } else {
      if (relativePath.includes("App")) {
      }
      const rs = fs.createReadStream(tempAbsolutePath);
      const ws = fs.createWriteStream(genAbsolutePath);
      rs.pipe(ws);
    }
  }
}

(async function () {
  const opts = await initParams();
  if (!checkUserParams(opts)) return;
  await generator(opts);
  notify("success", "模板生成成功！");
})();

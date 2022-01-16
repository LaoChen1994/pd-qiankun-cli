#!/usr/bin/env node
var program = require("commander");
var inquirer = require("inquirer");
var path = require("path");
var fs = require("fs");
var handler = require("handlebars");

let chalk = null;

const SUPPORT_TEMPLATE = {
  vueTs: "Vue 3 + Typescript",
  vueTsx: "Vue 3 + TSX",
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
    type: genPromotItem("template", "请选择子应用模板", "list", {
      choices: Object.keys(SUPPORT_TYPE).map((item) => ({
        name: SUPPORT_TYPE[item],
        value: item,
      })),
    }),
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

  console.log(opts);

  if (!opts.template) {
    notify("fail", "选择模板");
    return;
  } else if (!Object.keys(SUPPORT_TEMPLATE).includes(opts.template)) {
    notify("fail", "不支持的模板类型");
    return;
  }

  return true;
}

function renderTemplate() {
  const template = fs
    .readFileSync(path.resolve(__dirname, "./template.json"))
    .toString();
  const rlt = handler.compile(template)({ foo: 123 });
  console.log(rlt);
}

(async function () {
  const opts = await initParams();
  if (!checkUserParams(opts)) return;
  renderTemplate();
})();

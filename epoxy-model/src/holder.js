require("./strings");

const View = require("./view");

const viewBindingPattern = "<VIEWS_BINDING>";
const template = `
class Holder : KotlinEpoxyHolder() {
  ${viewBindingPattern}
}
`;

class Holder {
  constructor(views) {
    this.views = views;
  }

  brew() {
    const viewsBinding = this.views
      .map(view => `val ${view.id} by bind<${view.tag}>(R.id.${view.id})`)
      .join("\n");
    return template.replaceAll(viewBindingPattern, viewsBinding);
  }
}

module.exports = Holder;

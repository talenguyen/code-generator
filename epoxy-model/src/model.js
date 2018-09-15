require("./strings");

const View = require("./view");
const Holder = require("./holder");

const packagePattern = "<PACKAGE>";
const layoutPattern = "<LAYOUT>";
const namePattern = "<NAME>";
const holderPattern = "<HOLDER>";
const template = `
package ${packagePattern}

import com.airbnb.epoxy.EpoxyAttribute
import com.airbnb.epoxy.EpoxyModelClass
import com.airbnb.epoxy.EpoxyModelWithHolder
import ${packagePattern}.${namePattern}Model.Holder

@EpoxyModelClass(layout = R.layout.${layoutPattern})
abstract class ${namePattern}Model : EpoxyModelWithHolder<Holder>() {

  override fun bind(holder: Holder) {
    super.bind(holder)
    TODO("bind you model")
  }

  ${holderPattern}
  
`;

class Model {
  constructor(pkg, name, layout, holder) {
    this.pkg = pkg;
    this.name = name;
    this.layout = layout;
    this.holder = holder;
  }

  brew() {
    return template
      .replaceAll(packagePattern, this.pkg)
      .replaceAll(layoutPattern, this.layout)
      .replaceAll(namePattern, this.name)
      .replaceAll(holderPattern, this.holder.brew());
  }
}

module.exports = Model;

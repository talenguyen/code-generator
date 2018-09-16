# epoxy-model

Epoxy model generator

## Install

```shell
$ npm i epoxy-model
```

## Usage

```shell
$ epoxy-model <layout.xml> <name> <output>
```

Example

Given layout named `holder_message.xml` with content as following:
```xml
<?xml version="1.0" encoding="utf-8"?>
<TextView xmlns:android="http://schemas.android.com/apk/res/android"
    android:id="@+id/messageTextView"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:gravity="center"
    android:padding="8dp"
    android:textAppearance="@style/Body1">

</TextView>
```

Execute
```shell
$ epoxy-model ./src/main/res/layout/holder_message.xml Message ./src/main/java/vn/tiki/android/app/view
```

Will generate `TodoModel.kt` with content  as following:
```kotlin
package vn.tiki.android.app.view

import com.airbnb.epoxy.EpoxyAttribute
import com.airbnb.epoxy.EpoxyModelClass
import com.airbnb.epoxy.EpoxyModelWithHolder
import vn.tiki.android.app.view.MessageModel.Holder

@EpoxyModelClass(layout = R.layout.holder_message)
abstract class MessageModel : EpoxyModelWithHolder<Holder>() {

  override fun bind(holder: Holder) {
    super.bind(holder)
    TODO("bind you model")
  }

  
  class Holder : KotlinEpoxyHolder() {
    val messageTextView by bind<TextView>(R.id.messageTextView)
  }

}  
```

## Author
- Giang Nguyen <giangnguyen.tale@gmail.com> ([twitter](https://twitter.com/Tale_Nguyen))

Enjoy your work and [say thanks](https://saythanks.io/to/talenguyen) :)

## License

[MIT](LICENSE)


# Tiki-ViewHolder-Maker

CLI tools to make ViewHolderDelegate for [collection](https://github.com/talenguyen/AndroidDevelopment/tree/master/collection)

## Install

```shell
$ npm i tiki-viewholder-maker
```

## Usage

```shell
$ tiki-viewholder-maker <layout.xml> <name> <output>
```

Example

```shell
$ tiki-viewholder-maker ./src/main/res/layout/item_todo.xml Todo ./src/main/java/vn/tiki/android/example/viewholders
```

Will generate `TodoViewHolderDelegate.kt` as following

```kotlin
package vn.tiki.android.example.viewholders

import vn.tiki.android.collection.ListModel
import vn.tiki.android.collection.ViewHolderDelegate

object TodoModel : ListModel {

  val key_ = TodoModel::class.java.canonicalName
  
  override fun getKey(): String = key_

  override fun <T : ListModel> getViewHolderDelegateFactory(): () -> ViewHolderDelegate<T> {
    return {
      @Suppress("UNCHECKED_CAST")
      TodoViewHolderDelegate() as ViewHolderDelegate<ListModel>
    }
  }
}

class TodoViewHolderDelegate : BaseViewHolderDelegate<TodoModel>() {

  override fun layout(): Int = R.layout.item_todo

  override fun bind(model: TodoModel) {
    super.bind(model)
    TODO("bind model to your view")
  }

  override fun unbind() {
    super.unbind()
    TODO("release resources")
  }
}

```

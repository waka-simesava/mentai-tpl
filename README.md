# mentai-tpl

マシンの Ruby バージョンと干渉しない Gulp 使用のスタータープロジェクト。  
Gulp のグローバルインストールは不要、`node.js` のみで動作します。

## 環境

[node.js](https://nodejs.org/) のインストールが必要です。  
未インストールの場合は LTS 版をインストールしてください。

試していませんが、コマンドラインから入れる場合は [こちら](https://qiita.com/akakuro43/items/600e7e4695588ab2958d) などが参考になるかと思います。

## 初期設定

**1. node.js**（未インストールの場合）  
未インストールの場合は [node.js](https://nodejs.org/) にアクセスして LTS 版をPCにインストールしてください。  
（インストール済みの場合はこの手順は飛ばしてください。）

**2. npm install**  
Clone したら、ターミナルで `npm install` で必要なモジュールをインストールしてください。  

**3. npm start**  
`npm start` で初期ファイルが `dest` ディレクトリに生成され、監視状態になります。  
ブラウザが起動し、ターミナルでエラーが出ていなければ環境構築に成功しています。

パッケージのローカルで Gulp が走る設定をしているので、グローバルインストールは不要です。  
グローバルインストールしたい場合は [ローカル開発環境のセットアップ手順#Gulp のインストール](https://github.com/waka-simesava/docs/blob/master/set-up.md#gulp-%E3%81%AE%E3%82%A4%E3%83%B3%E3%82%B9%E3%83%88%E3%83%BC%E3%83%AB) などを参考にしてください。

## スタート

`npm start`

その他、npm script は適宜設定をお願いします。

## 初期構築時

HTML のテンプレートエンジンに Pug があります。  
プレーンな HTML で構築するか Pug を利用するか最初に決めてください。

|開発言語| ディレクトリ |処理        |
|------|------------|------------|
|HTML  |`/_src/html/`|"plain_html"|
|Pug   |`/_src/pug/` |"pug_html" |

混乱を防ぐために不要な開発ディレクトリを削除し、関連処理についても gilpfile.js から削除してください。

※ EJS はこれから実装予定です。

## 開発時の設定

`_src` ディレクトリが開発用です。生成されたファイルは `dest` ディレクトリに入ります。  
もしこれらの設定を変更したい場合は `gulpfile.js` の下記の箇所を任意に修正してください。

```js
const
  SRC = './_src',
  DST = './dest',
  DST_ASSETS = DST+'/_assets'
```

また、WordPress 等でテーマ用の PHP ファイルと、ベースコーディング時の静的ファイルとをディレクトリで分けたい場合など下記の設定を変えてください。

```js
const
  static_dir_use = true, // <= 静的書き出しディレクトリを分ける場合は `true`
  static_dir_name = '__static' // <= 静的書き出しディレクトリの名前
```

`true` にすると、HTMLだけ dest が `__static` になります。  
（ローカルサーバーも `__static` を含めて起動されます。）

## 注意点

`dest` ディレクトリ内で直接ファイルを追加・編集・削除することは基本的に行わない想定です。  
そのため、コンパイル後の `dest` は監視対象外としており、初回クローン時にファイルは含まれません。

この設定を変更したい場合は `.gitignore` を適宜修正ください。

## JS に関して

バンドルとトランスパイルの設定済みです。  

また、検証用に下記を NPM に含めています。  
案件に合わせて追加・削除など適宜調整願います。

```json
"dependencies": {
  "jquery": "^1.12.4",
  "jquery-inview": "^1.1.2",
  "lodash": "^4.17.11",
  "object-fit-images": "^3.2.4",
  "slick-carousel": "^1.8.1",
  "svgxuse": "^1.2.6"
}
```

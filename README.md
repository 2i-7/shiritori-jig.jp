最初に失敗談(自分の記録用)

・学生寮に住んでいて、学内Wi-fiを使っていたせいでDenoの初期インストールが出来ずかなりスタートが遅れた

→後々プロキシの問題だと気づき、スマホでテザリングしたら一発で通って泣いた

・開発期限3日前、エラーがひっきりなしに出た焦りから、[強制的にpushする方法](https://qiita.com/Takao_/items/5e563d5ea61d2829e497)を試したら、いままでの履歴たちがいなくなってしまいました。がんばります。

# 使用した技術

|言語|用途|
|----|----|
|Deno|サーバーの処理|
|JavaScript|機能の制御や動作の追加|
|HTML|ページ内の情報を構造化|
|CSS|構造要素の装飾|


# 機能紹介

|TapToStartの画面|モード選択画面|
|----|----|
|![taptostart](https://github.com/2i-7/shiritori-jig.jp/assets/169513507/4f48b334-c478-417a-b220-f3fb9b5c86d3)|![modeselect](https://github.com/2i-7/shiritori-jig.jp/assets/169513507/3492f93c-2caf-4f69-91e9-2af89d7d7d4a)|
|![taptostart2](https://github.com/2i-7/shiritori-jig.jp/assets/169513507/78d53eae-93ce-4ae2-9fc6-3f1d0c65243d)|![example](https://github.com/2i-7/shiritori-jig.jp/assets/169513507/33a00317-4d2a-4c9f-984b-8369c721e9d2)|
|画面を押されたら恐竜が生まれて、モード選択画面へ飛ぶ|モード選択画面で選択したら、各ゲームに遷移する。(例：「完全一人モード」へ移動したときの写真)|

|完全一人モード|完全一人モードの結果画面|
|----|----|
|![singleringo](https://github.com/2i-7/shiritori-jig.jp/assets/169513507/64a377c0-5485-4d7b-8ee3-b9eb42bae43e)|![singleresult](https://github.com/2i-7/shiritori-jig.jp/assets/169513507/0002d623-1c16-442a-beea-2b3d96ea6846)|
|<img width="425" alt="single2" src="https://github.com/2i-7/shiritori-jig.jp/assets/169513507/d450b9e0-d601-4788-a7d1-0c50e0000c87">|![singlekekka](https://github.com/2i-7/shiritori-jig.jp/assets/169513507/a721a93f-b4ab-4f65-9c04-5148cffbfbfb)|
|単語を入力して送信ボタン(またはEnterキー)を押すと、判定されて問題なければ、前の単語として表示される|入力された単語数と、結果の表示/非表示に合わせて恐竜が火を噴く(恐竜って火噴くのかな？)|

|みんなでわいわいモードのプレイヤー名入力|みんなでわいわいモードのプレイ画面|
|----|----|
|![multi](https://github.com/2i-7/shiritori-jig.jp/assets/169513507/7c22e391-57bb-4a50-9366-a3d7b9ab7f0b)|![画像15](https://github.com/2i-7/shiritori-jig.jp/assets/169513507/227b431c-17b6-4f9f-8b60-00dc51a472cf)|
|![playername](https://github.com/2i-7/shiritori-jig.jp/assets/169513507/affeb014-9ba7-47cd-bbe7-a2e3f936d9f6)|<img width="425" alt="画像17" src="https://github.com/2i-7/shiritori-jig.jp/assets/169513507/7bfbba67-f1db-4d7a-8a8b-13f85904b475">|
|2~4人の中から人数を選択し、各プレイヤーの名前を保存する。また、ここでは任意の名前を入力することができる。|実際のゲーム画面では、前の単語だけでなく、プレイヤーアイコンとプレイヤー名も表示し、送信ボタン(またはEnterキー)を押すとプレイヤーアイコンが手をあげる|

|みんなでわいわいモード|の結果画面|
|----|----|
|![8](https://github.com/2i-7/shiritori-jig.jp/assets/169513507/6c539277-b6d4-4a8b-a77e-be89185931d6)|![aa](https://github.com/2i-7/shiritori-jig.jp/assets/169513507/cb58ce95-bc5a-410b-b026-04ad3a5627ae)|
|最後に入力したプレイヤー(負けた)の名前を表示し、|結果の表示/非表示に合わせて恐竜が火を噴く|



# 実装した機能

## 最低限の仕様([jig.jpさんのサマーインターンシップ概要から引用](https://jigintern.github.io/intern-2024-assignment/))

・直前の単語を、表示できるようにする

・任意の単語を、入力できるようにする

・直前の単語の末尾と、入力した単語の先頭を比較して、同じ場合だけ単語を更新する。違う場合は、エラーを表示する

・末尾が「ん」で終わる単語が入力されたら、ゲームを終了する

・過去に使用した単語が入力されたら、ゲームを終了する

・ゲーム中や終了後に、最初からやり直せるリセット機能をつける

## 追加した仕様

#### ゲーム内

・送信ボタンではなく、Enterキーを押しても送信できるようにした。

・「ー」が最後に入力された場合はそのひとつ前の文字が、次の最初の文字になる。

  例：「るびー」の場合、次の最初の文字は「び」

・ホームボタンは左上に表示し、押すとすべての配列(設定)がリセットされ、TapToStartの画面に移動するようになっている。

・「みんなでわいわいモード」というみんなで4人まで一緒に遊べるようなモードを追加した。

・みんなでわいわいモードでは、プレイヤー名を登録することが出来、自分の番になったら自分の名前が表示される。

・みんなでわいわいモードでは、送信ボタンを押したら、プレイヤーアイコンのかわいいやつらに手を挙げさせるようにした。

#### 結果ページ

・エラーメッセージの表示

・結果ページを追加し、今まで入力した単語の履歴を表示できるようにした。

・「結果の表示」「結果の非表示」で表示を切り替えることが出来る。

・完全一人モードの結果ページでは、何単語入力できたのか表示する。

・みんなでわいわいモードの結果ページでは、負けたプレイヤーの名前が表示される。

### その他

・TapToStartの画面を追加したことで、これからゲームが始まるんだなみたいなわくわく感を感じてもらえるようにした

・選択画面で必ず選択しないとけないようにするために、requiredを使用した。


## デザイン面

・素材は全て自分で描いたものを使用した。愛着を沸かせるため。

・TapToStartの画面を押すと恐竜が卵から出てくるようなゆるい感じにした。

・ホームボタン以外は全て中央に配置したことで、プログラム全体に統一感を持たせた。

・ボタンのみ緑にしたことで、シンプルでかつ視覚的にもわかりやすいデザインにした。

・背景とボタン、そしてイラストの色も原色を使用しないことで見やすい(目に優しい)デザインにした。

・みんなでわいわいモードでは、自分の名前だけでなくプレイヤーアイコンを表示できるようにすることで、視覚的に誰の番なのかがわかるようにした。

・結果ページでは、結果の表示/非表示に合わせて恐竜が火を噴くようにした。

・入力欄やボタン、その他の場所でカーソルの形を変えた

例：入力欄では「I」ボタンでは「(指)」にした



# アプリの動作確認の方法

お手数をおかけしますが、Denoを持ちいてローカルHTTPサーバーを立てる形で作成したため、一度すべてのファイルをダウンロードして頂きたいです。

・deno run --allow-read --allow-net --watch server.js　とターミナルでうつ

・localhost:8080へアクセスすることで、TapToStartの画面が出てくると思います。

・モード選択で1人プレイか複数人かを選択して頂くとゲームがスタートします。


# 参考資料

### GitHub

・[GitHubのセットアップ](https://yakiimosan.com/vscode-git-github-howto-use/#index_id6)

・[branchとmergeについて](https://qiita.com/mat827/items/32fcc5d8537dee1dda57)

・[サル先生のGit入門](https://backlog.com/ja/git-tutorial/stepup/06/)

・[git reset --hardで削除できないファイルの消し方](https://prograshi.com/general/git/how-to-undo-modifications/)

・[proxyの消し方](https://web-engineer-wiki.com/git/config-unset/)

・[git pushでエラーが出た](https://qiita.com/kkchysk/items/e4198ff4161b660affb0)

・[リモートから取得する](https://phoeducation.work/entry/20210824/1629759480)

・[リポジトリのURLとは](https://qiita.com/s56258/items/68e5e2c758bf77016952)

・[コンフリクトの解消方法](https://qiita.com/yyy752/items/414d890c8d0cc96c6ede)


### README

・[READMEに画像を表示する](https://qiita.com/kimino0525/items/aa13c6450071dac6be75)

・[読みたくなるREADMEの書き方](https://qiita.com/ren_ichinose/items/15b5a156ae43ea2b3425)
### Deno

・[非同期処理とは？ 同期処理との違い、実装方法について解説](https://www.rworks.jp/system/system-column/sys-entry/21730/)

・[非同期処理とは何か、何が嬉しいの？](https://qiita.com/yunity29/items/7ccc84d47e139340ecbc)

・[小学生でもわかるasync/await/Promise入門](https://teams.microsoft.com/l/message/48:notes/1716691477284?context=%7B%22contextType%22%3A%22chat%22%7D)

・[Denoの静的ファイルサーバーを3行で書く](https://qiita.com/access3151fq/items/0ff2c50874bba3869ef0)

・["GETメゾット"と"POSTメゾット"の違い](https://wa3.i-3-i.info/diff7method.html)

・[ファイルの読み込みを許可するpermission](https://qiita.com/kt3k/items/53174d45304f3a7d6ddb)

・[文字の一部を取り出す](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String/slice)


### JavaScript

・[画面遷移後の値渡し](https://yurupro.cloud/3107/#toc1)

・[Enterキーでも送信できる](https://zoshigayan.net/how-to-get-key-from-ui-event/)

・[querySelector()の使い方をまとめてみた](https://webstyle.work/queryselector/)

・[デフォルトの動作をキャンセル](https://qiita.com/yokoto/items/27c56ebc4b818167ef9e)

・[awaitを付けた関数について](https://ja.stackoverflow.com/questions/54376/fetch-%E3%81%A8-await-fetch-%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6)

・[◯秒後にリダイレクトする方法](https://1-notes.com/javascript-redirect-after-x-seconds/)

・[ページ読み込み後に行う処理]([https://www.sejuku.net/blog/19754](https://qiita.com/s_ryota/items/ac26a2fb9a62c16561ce))

・[ブラウザにデータを保存](https://b-risk.jp/blog/2021/07/sessionstorage/)

・[setTimeout](https://qiita.com/nuko-suke/items/5b16ab9de402547c5797)

### HTML

・[label要素の使い方](https://style.potepan.com/articles/20037.html#labelfor)

・[選択ボタンを必須にする](https://ja.stackoverflow.com/questions/89675/html%E3%83%95%E3%82%A9%E3%83%BC%E3%83%A0%E3%81%AEselect%E8%A6%81%E7%B4%A0%E3%82%92%E5%BF%85%E9%A0%88%E9%A0%85%E7%9B%AE%E3%81%AB%E3%81%99%E3%82%8B)

### CSS

・[frex-directionで主軸を垂直に](https://dekiru.net/article/13233/)

・[align-itemsで中央揃えさせる](https://zero-plus.io/media/css-align-items-how-to-use/)

・[vh単位を使ってみたかった](https://ui-hack.com/programming/html_css/css_units_vw_vh_vmin_vmax/#i-1)

・[em単位について](https://www.attend.jp/desine_170220)

・[ボタンを角丸にする](https://www.webcreatorbox.com/tech/border-radius)

・[マウスカーソルの形](https://web-camp.io/magazine/archives/88828)


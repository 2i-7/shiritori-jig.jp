# 最初に失敗談(自分の記録用)

・学生寮に住んでいて、学内Wi-fiを使っていたせいでDenoの初期インストールが出来なくてかなりスタートが遅れた

→後々プロキシの問題だと気づき、スマホでテザリングしたら一発で通って泣いた

・開発期限3日前、エラーがひっきりなしに出た焦りから、[強制的にpushする方法](https://qiita.com/Takao_/items/5e563d5ea61d2829e497)を試したら、いままでの履歴たちがいなくなってしまいました。がんばります。


# 実装した機能

## 最低限の仕様([jig.jpさんのサマーインターンシップ概要から引用](https://jigintern.github.io/intern-2024-assignment/))

・直前の単語を、表示できるようにする

・任意の単語を、入力できるようにする

・直前の単語の末尾と、入力した単語の先頭を比較して、同じ場合だけ単語を更新する。違う場合は、エラーを表示する

・末尾が「ん」で終わる単語が入力されたら、ゲームを終了する

・過去に使用した単語が入力されたら、ゲームを終了する

・ゲーム中や終了後に、最初からやり直せるリセット機能をつける

## 追加した仕様

・送信ボタンではなく、Enterキーを押しても送信できるようにした。

・TapToStartの画面を追加し、押すと恐竜が卵から出てくるようなゆるい感じにした。

・結果ページを追加した。

・結果ページでは、今まで入力した単語の履歴を表示できるようにした。

・結果ページで「結果の表示」「結果の非表示」で表示を切り替えることが出来、それに合わせて恐竜が火を噴くデザインを追加した。

・ホームボタンは左上に表示し、押すとすべての配列(設定)がリセットされ、デザインが変わり、TapToStartの画面に移動するようになっている。

・「みんなでわいわいモード」というみんなで4人まで一緒に遊べるようなモードを追加した

・みんなでわいわいモードでは、プレイヤー名を登録することが出来、自分の番になったら自分の名前が表示されます。

・

# 参考資料
言葉の意味・定義

・[非同期処理とは？ 同期処理との違い、実装方法について解説](https://www.rworks.jp/system/system-column/sys-entry/21730/)

・[非同期処理とは何か、何が嬉しいの？](https://qiita.com/yunity29/items/7ccc84d47e139340ecbc)

・[小学生でもわかるasync/await/Promise入門](https://teams.microsoft.com/l/message/48:notes/1716691477284?context=%7B%22contextType%22%3A%22chat%22%7D)

・[「GETメゾット」と「POSTメゾット」の違い](https://wa3.i-3-i.info/diff7method.html)


技術面
・[Denoの静的ファイルサーバーを3行で書く](https://qiita.com/access3151fq/items/0ff2c50874bba3869ef0)

・[querySelector()の使い方をまとめてみた](https://webstyle.work/queryselector/)

・[label要素の使い方](https://style.potepan.com/articles/20037.html#labelfor)

・[画面遷移後の値渡し](https://yurupro.cloud/3107/#toc1)

・[Enterキーでも送信できる](https://zoshigayan.net/how-to-get-key-from-ui-event/)

・[デフォルトの動作をキャンセル](https://qiita.com/yokoto/items/27c56ebc4b818167ef9e)

・[ひらがな/カタカナ](https://www.javadrive.jp/regex-basic/sample/index8.html)

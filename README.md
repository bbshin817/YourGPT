# YourGPT
事前に記述した文章を、まるでAIがレスポンシブしているかのように表示させることが出来る、簡易的なWeb APPです。
## 使い方
同梱の**msgs.json**へ、配列形式でメッセージを記述します。
YourGPTは、与えられているメッセージを上から順番に出力します。
### Sample
[YourGPT on github pages](https://bbshin817.github.io/YourGPT/)
### msgs.json
```json
[
	"こんばんは、何かご用でしょうか？",
	"私に出来ることは、msgs.jsonに設定されたメッセージを、さもたった今生成した文章であるかのように返却することだけです。また、オリジナルの状態で私が返せるメッセージは、ここまでです。"
]
```
### Chrome
![YourGPT Preview](https://raw.githubusercontent.com/bbshin817/YourGPT/main/screen.jpg)
## 設定
`main.js`内のmsg.getResponse()内の記述を変えることで、YourGPTのレスポンス遅延を調節することができます。
```javascript
gptResponse : (string) => {
	return new Promise(async (resolve) => {
		...
		// レスポンス自体が返却されるまでの遅延
		await msg.s(Math.random() * [最大値 - 最小値] + [最小値]);
		for(let i=0; i<r.length; i++){
			// 文節ごとの遅延
			await msg.s(Math.random() * [最大値 - 最小値] + [最小値]);
			d.find("l").before(r[i]);
		};
		// 全レスポンスが完了した後、白円が消えるまでの遅延
		await msg.s(Math.random() * [最大値 - 最小値] + [最小値]);
		...
	});
}
```

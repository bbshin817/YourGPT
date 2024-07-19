$(function(){
	let gptResponse = {
		index : 0,
		msgs : [],
		load : () => {
			return new Promise(async (resolve) => {
				gptResponse.msgs = await (await fetch("./msgs.json")).json();
			});
		}
	};

	let msg = {
		sc : () => {
			$("ct.body").scrollTop($("ct.body")[0].scrollHeight);
		},
		txt2randomSplit : (str) => {
			let s = str.split("");
			let n = "";
			let r = 0;
			let ss = [];
			for(let i=0; i<s.length; i++){
				if(r < i){
					r = Math.trunc(Math.random() * 5) + 1 + i;
					n = n.replace(/\n/g, "<br>");
					ss.push(n);
					n = "";
				}
				n += s[i];
			}
			if(0 < n.length){
				n = n.replace(/\n/g, "<br>");
				ss.push(n);
			}
			return ss;
		},
		s : (sec) => {
			return new Promise((resolve) => {
				setTimeout(resolve, sec);
			});
		},
		gptResponse : (string) => {
			return new Promise(async (resolve) => {
				$("gpt-big-icon").remove();
				$("ct.body").append("<chatbox type=\"gpt\"><gpt-icon><div></div></gpt-icon><msg-box><l></l></msg-box></chatbox>");
				msg.sc();
				let d = $("chatbox[type=\"gpt\"]").eq($("chatbox[type=\"gpt\"]").length - 1);
				let r = msg.txt2randomSplit(string);
				await msg.s(Math.random() * 3000 + 500);
				for(let i=0; i<r.length; i++){
					await msg.s(Math.random() * 150 + 10);
					d.find("l").before(r[i]);
				};
				await msg.s(Math.random() * 2000 + 100);
				msg.sc();
				d.find("l").remove();
				resolve();
			});
		},
		autoGptResponse : () => {
			if(gptResponse.msgs[gptResponse.index]){
				msg.gptResponse(gptResponse.msgs[gptResponse.index]);
				gptResponse.index++;
			}
		},
		insertMsg : (string) => {
			let s = string.replace(/\n/g, "<br>");
			$("ct.body").append(`<chatbox type="me"><msg-box>${s}</msg-box></chatbox>`);
			msg.sc();
		},
		submit : () => {
			let t = $("textarea").val();
			$("textarea").val("");
			$("ct.body").css("height", "");
			$("ct.footer").css("height", "");
			$("textbox").css("height", "");
			$("textarea").css("height", "");
			msg.insertMsg(t);
			msg.autoGptResponse();
		}
	};

	let k = {
		Enter : false,
		Shift : false
	};

	gptResponse.load();

	const ta = document.getElementById("t");
	const ch = ta.clientHeight;
	ta.addEventListener("input", ()=>{
		if($("textarea").val()[0] == "\n"){
			$("textarea").val("");
			return false;
		};
		ta.style.height = ch + "px";
		const sh = ta.scrollHeight;
		$("ct.body").css("height", `calc(100svh - 6.25vh - 62.5px - ${sh}px)`);
		$("ct.footer").css("height", `calc(45px + ${sh}px)`);
		$("textbox").css("height", `calc(32.5px + ${sh}px)`);
		ta.style.height = sh + "px";
	});
	$("textarea").on("keydown", function(e){
		k[e.key] = true;
		if(!k.Shift && k.Enter && $("textarea").val()[0] != "\n" && 0 < $("textarea").val().length){
			msg.submit();
		}
		$("svg.submit").attr("state", 0 < $("textarea").val().length ? "true" : "false");
	});
	$("textarea").on("keyup", function(e){
		k[e.key] = false;
		$("svg.submit").attr("state", 0 < $("textarea").val().length ? "true" : "false");
	});
});

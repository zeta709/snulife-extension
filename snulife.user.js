// @author         zeta709
// @version        version 0.3_2010-01-26
// Copyright (c) 2010, zeta709.
// ==UserScript==
// @name           SNULIFE
// @namespace      http://noexists.tistory.com/
// @description    Make an article printable.
//                 스누라이프 게시물을 인쇄에 적합하도록 편집함.
// @include        http://www.snulife.com/*
// ==/UserScript==

function removeElementById(id)
{
	var rm = document.getElementById(id);
	if (rm)
		rm.parentNode.removeChild(rm);
}

function removeElementsByClassName(className)
{
	var rm = document.getElementsByClassName(className);
	// http://crisp.tweakblogs.net/blog/485/
	// some-thoughts-on-html5s-getelementsbyclassname.html
	// the array changes each time?
	for (var i = rm.length - 1; i >= 0; --i) {
		rm[i].parentNode.removeChild(rm[i]);
	}
}

function addGlobalStyle(css)
{
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head)
	    return;
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function makePrintablePage(removeReply)
{
	var contentBody = document.getElementById('contentBody');
	var topLogo = document.getElementById('topLogo');
	var textTitle = document.getElementById('textTitle');
	var clear_2 = document.createElement('div');
	clear_2.className = 'clear';

	removeElementById('header');

	var header_2 = document.createElement('div');
	header_2.id = 'header';
	if (topLogo)
		header_2.appendChild(topLogo);
	if (textTitle)
		header_2.appendChild(textTitle);
	header_2.appendChild(clear_2);
	if (contentBody) {
		contentBody.parentNode.insertBefore(header_2, contentBody);
	}

	removeElementById('columnLeft');
	removeElementById('columnRight');
	removeElementById('footer');
	removeElementById('waitingforserverresponse'); // what's this?
	removeElementById('fororiginalimagearea'); // what's this?
	removeElementById('membermenuarea'); // what's this?
	removeElementsByClassName('boardHeaderLine');
	removeElementsByClassName('boardComment');
	removeElementsByClassName('googleAd');
	removeElementsByClassName('boardWrite');
	removeElementsByClassName('boardList');
	removeElementsByClassName('listLink');

	var clear = document.getElementsByClassName('clear');
	if (clear) {
		var i = clear.length - 1;
		var pageNavigation = clear[i].getElementsByClassName('pageNavigation');
		if (pageNavigation.length > 0)
			clear[i].parentNode.removeChild(clear[i]);
	}

	var readFooter = document.getElementsByClassName('readFooter');
	if (readFooter.length > 0) {
		var buttonList = readFooter[0].getElementsByClassName('buttonList');
		if (buttonList.length > 0)
			buttonList[0].parentNode.removeChild(buttonList[0]);
		var voteButton = readFooter[0].getElementsByClassName('voteButton');
		if (voteButton.length > 0)
			voteButton[0].parentNode.removeChild(voteButton[0]);
	}

	if (removeReply) {
		removeElementById('reply');
	} else {
		var reply = document.getElementById('reply');
		if (reply.childElementCount == 0) {
			reply.innerHTML = "(댓글 없음)";
		} else {
			removeElementsByClassName('replyOption');

			var replyContentHideNotice = document.getElementsByClassName('replyContentHideNotice');
			if (replyContentHideNotice) {
				for (var i=0; i < replyContentHideNotice.length; ++i) {
					var text = replyContentHideNotice[i].getElementsByClassName('replyContentHideText');
					if (text.length > 0)
						text[0].innerHTML = "내용감추기";
					replyContentHideNotice[i].nextElementSibling.style.display = 'block';
				}
			}
		}
	}

	addGlobalStyle('#bodyWrap, #header, #contentBody {width: 620px;}');
}

function insertFunction()
{
	var columnLeft = document.getElementById('columnLeft');
	if (columnLeft) {
		addGlobalStyle("#myTool {"
			       + "width: 94px; border: 2px solid #ccc; "
			       + "background: #fff; padding: 10px 6px 10px 6px;}"
			       + "#myTool ul li {"
			       + "color: #555555; "
			       + "padding: 3px 2px 2px 6px; "
			       + "background: url(http://www.snulife.com/"
			       + "layouts/apollo_v2/images/common/bulletLnbGray.gif) "
			       + "no-repeat left 10px;}");

		var ul = document.createElement('ul');

		var li = document.createElement('li');
		li.addEventListener("click",
				    function(event){makePrintablePage(false)}, false);
		li.innerHTML = "인쇄";
		ul.appendChild(li);

		var li_2 = document.createElement('li');
		li_2.addEventListener("click",
				      function(event){makePrintablePage(true)}, false);
		li_2.innerHTML = "인쇄(본문만)";
		ul.appendChild(li_2);

		var space = document.createElement('div');
		space.className = 'columnLeftSpace';
		columnLeft.appendChild(space);

		var print = document.createElement('div');
		print.id = 'myTool';
		print.appendChild(ul)

		columnLeft.appendChild(print);
	}
	var headerMenuList = document.getElementById('headerMenuList');
	if (headerMenuList) {
		addGlobalStyle("#headerMenuList li {"
			       + "color: #777; font-size: 11px;}");

		var li = document.createElement('li');
		li.addEventListener("click",
				    function(event){makePrintablePage(false)}, false);
		li.innerHTML = "인쇄";

		var li_2 = document.createElement('li');
		li_2.addEventListener("click",
				      function(event){makePrintablePage(true)}, false);
		li_2.innerHTML = "인쇄(본문만)";

		headerMenuList.insertBefore(li, headerMenuList.firstChild);
		headerMenuList.insertBefore(li_2, headerMenuList.firstChild);
	}
	var fo_comment_write = document.getElementById('fo_comment_write');
	if (fo_comment_write) {
		var commentButton = document.getElementsByClassName('commentButton');
		if (commentButton.length > 0) {
			var button_1 = document.createElement('span');
			button_1.className = "button";
			var input_1 = document.createElement('input');
			input_1.addEventListener("click",
						 function(event){makePrintablePage(false)}, false);
			input_1.type = "button";
			input_1.value = "인쇄";
			button_1.appendChild(input_1);
			commentButton[0].insertBefore(button_1,
						     commentButton[0].firstChild);

			var button_2 = document.createElement('span');
			button_2.className = "button";
			var input_2 = document.createElement('input');
			input_2.addEventListener("click",
						 function(event){makePrintablePage(true)}, false);
			input_2.type = "button";
			input_2.value = "인쇄(본문만)";
			button_2.appendChild(input_2);
			commentButton[0].insertBefore(button_2,
						      commentButton[0].firstChild);
		}
	}
}

insertFunction();


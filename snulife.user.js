// @author         zeta709
// @version        version 0.6.1_2013-09-07
// Copyright (c) 2010-2013, zeta709.
// ==UserScript==
// @name           SNULIFE
// @namespace      zeta709
// @description    스누라이프를 위한 크롬 확장 기능입니다.
// @include        http://snulife.com/*
// @include        http://*.snulife.com/*
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

function removePowerLink()
{
	var div = document.getElementById('comment');
	if (!div)
		return;
	div = div.getElementsByClassName('cmt_editor');
	if (div.length != 1)
		return;
	var suspect = div[0].nextElementSibling;
	if (!suspect)
		return;
	// suspect가 진짜 광고인지 확인
	if (suspect.childElementCount != 1)
		return;
	var tmp = suspect.getElementsByTagName('table');
	if (tmp.length <= 0)
		return;
	tmp = tmp[0].getElementsByTagName('tbody');
	if (tmp.length <= 0)
		return;
	tmp = tmp[0].getElementsByTagName('tr');
	if (tmp.length <= 0)
		return;
	tmp = tmp[0].getElementsByTagName('td');
	if (tmp.length <= 0)
		return;
	if (tmp[0].innerHTML.indexOf('powerlink') != -1)
		suspect.parentNode.removeChild(suspect);
}

function removeMegaEnglish()
{
	var div = document.getElementById('bd');
	if (!div)
		return;
	div = div.getElementsByClassName('rd_ft');
	if (div.length != 1)
		return;
	var suspect = div[0].nextElementSibling;
	if (!suspect)
		return;
	// suspect가 진짜 광고인지 확인
	if (suspect.childElementCount != 2)
		return;
	var tmp = suspect.getElementsByTagName('a');
	if (tmp.length < 0)
		return;
	if (tmp[0].href.indexOf('megaenglish') != -1)
		suspect.parentNode.removeChild(suspect);
}

function removeAds()
{
	removePowerLink();
	removeMegaEnglish();
//	리뉴얼 이후 없어진 광고들 주석 처리
//	removeElementById('google_image_div');
//	removeElementsByClassName('googleAd');
//	removeElementsByClassName('googleAd1');
	removeElementsByClassName('GoogleBox');
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
	removeAds();

	var content = document.getElementById('content');
	var sub_content = document.getElementById('sub_content');
	// 로고 위치 변경
	var logo = document.getElementById('logo');
	if (sub_content && content && logo)
		sub_content.insertBefore(logo, content);
	addGlobalStyle('#logo {position: relative !important; margin: 0px !important;}');
	// URL 추가
	var myurl = document.createElement('div');
	myurl.innerHTML = document.URL;
	myurl.style.clear = "both";
	if (sub_content && content)
		sub_content.insertBefore(myurl, content);
	// 상단 제거
	removeElementById('header');
	// 하단 제거
	removeElementById('footer');
	// 사이드 영역 제거
	removeElementById('sub_lnb');
	// 3단 영역 제거
	removeElementById('sub_col3');
	// 게시물 목록 제거
	removeElementById('bd_lst_wrp');
	// 댓글 작성 폼 제거
	removeElementsByClassName('cmt_editor');
	// 
	removeElementById('prev_next');
	// 네비게이션 제거
	removeElementsByClassName('rd_ft_nav');
	// side 네비게이션 제거
	removeElementsByClassName('rd_nav_side');
	// 스타일 수정 (글 내용 중앙 정렬을 위해)
	addGlobalStyle('#bodyWrap, #contentBody, #sub_content {width: 635px !important;}');

	if (removeReply) {
		removeElementById('comment');
	}
}

function insertFunction()
{
	var my_a = document.createElement('a');
	my_a.addEventListener("click",
			function(event){makePrintablePage(false)}, false);
	my_a.innerHTML = "인쇄";
	// 넣을 위치 찾기
	var headerMenuList = document.getElementById('outlogin');
	if (!headerMenuList)
		return;
	var x = headerMenuList.getElementsByTagName('div');
	if (x.length < 0)
		return;
	x = x[0].getElementsByTagName('div');
	if (x.length < 0)
		return;
	x = x[0].getElementsByTagName('form');
	if (x.length < 0)
		return;
	x = x[0].getElementsByTagName('div');
	if (x.length != 3)
		return;
	x[1].appendChild(my_a);
}

function hideMemberName()
{
	var headerMenuList = document.getElementById('outlogin');
	if (!headerMenuList)
		return;
	var x = headerMenuList.getElementsByTagName('div');
	if (x.length < 0)
		return;
	x = x[0].getElementsByTagName('div');
	if (x.length < 0)
		return;
	x = x[0].getElementsByTagName('form');
	if (x.length < 0)
		return;
	x = x[0].getElementsByTagName('div');
	if (x.length < 0)
		return;
	x = x[0].getElementsByTagName('a');
	if (x.length < 0)
		return;
	x[0].innerHTML = '********';
}

hideMemberName();
removeAds()
insertFunction();

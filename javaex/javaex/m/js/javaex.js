/**
 * 作者：陈霓清
 * 官网：http://www.javaex.cn
 */
;(function() {
	var javaex = function() {
		// 默认属性
		function defaults(args) {
			var defaults = {
				
			};
			return $.extend(defaults, args);
		}

		var info = {
			/**
			 * 生成一个随机ID
			 */
			getUUID : function() {
				return Date.now().toString(36) + Math.random().toString(36).substr(3, 3);
			},
			
			/**
			 * 截取指定字符串左边的数据
			 *     str    ：原始字符串
			 *     subkey : 指定的字符串
			 *     flag   : 截取的字符串是否包含key本身（默认不包含）
			 */
			substringLeft : function(str, subkey, flag) {
				if (!info.ifnull(str) || !info.ifnull(subkey)) {
					return false;
				}

				let index = str.lastIndexOf(subkey);
				// 如果没找到，直接返回字符串本身
				if (index === -1) {
					return str;
				}
				if (flag) {
					// 包含本身
					return str.substring(0, index) + subkey;
				} else {
					// 不包含本身
					return str.substring(0, index);
				}
			},

			/**
			 * 截取指定字符串右边的数据
			 *     str    ：原始字符串
			 *     subkey : 指定的字符串
			 *     flag   : 截取的字符串是否包含key本身（默认不包含）
			 */
			substringRight : function(str, subkey, flag) {
				if (!info.ifnull(str) || !info.ifnull(subkey)) {
					return false;
				}

				let index = str.lastIndexOf(subkey);
				// 如果没找到，直接返回字符串本身
				if (index === -1) {
					return str;
				}
				if (flag) {
					// 包含本身
					return str.substring(index, str.length);
				} else {
					// 不包含本身
					return str.substring(index + key.length, str.length);
				}
			},
			
			/**
			 * 获取地址栏参数
			 */
			getParam : function(key) {
				let reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
				let r = window.location.search.substr(1).match(reg);
				if (r != null) {
					return unescape(r[2]);
				}
				return null;
			},
			
			// 得到系统时间
			/**
			 * 格式化数字，不足10，补0
			 */
			add0 : function(num) {
				return (num>=0 && num<=9) ? ("0" + num) : num;
			},
			// 返回今日日期，格式yyyy-MM-dd
			getToday : function() {
				let date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				
				return year + "-" + info.add0(month) + "-" + info.add0(day);
			},
			getDay : function() {
				return new Date().getDate();
			},
			getMonth : function() {
				return new Date().getMonth() + 1;
			},
			getYear : function() {
				return new Date().getFullYear();
			},
			// 返回星期：1-7
			getWeek : function() {
				let week = new Date().getDay();
				return week==0 ? 7 : week;
			},
			// 返回当前时间，格式yyyy-MM-dd HH:mm:ss
			now : function() {
				let date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				
				return year + "-" + info.add0(month) + "-" + info.add0(day) + " " + info.add0(date.getHours()) + ":" + info.add0(date.getMinutes()) + ":" + info.add0(date.getSeconds());
			},
			
			/* 
			 * 获得时间差
			 * startTime : 开始时间（时间格式为 yyyy-MM-dd HH:mm:ss 例如：2018-06-21 00:00:00）
			 * endTime : 结束时间（时间格式为 yyyy-MM-dd HH:mm:ss 例如：2018-06-21 00:00:00）
			 * type : 返回精度（second，minute，hour，day）
			 */
			getTimeDiff : function(startTime, endTime, type) {
				//将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式
				startTime = startTime.replace(/\-/g, "/");
				endTime = endTime.replace(/\-/g, "/");
				//将计算间隔类性字符转换为小写
				type = type.toLowerCase();
				let sTime = new Date(startTime);//开始时间
				let eTime = new Date(endTime);	//结束时间
				
				// 作为除数的数字
				let divNum = 1;
				switch (type) {
					case "second":
						divNum = 1000;
						break;
					case "minute":
						divNum = 1000 * 60;
						break;
					case "hour":
						divNum = 1000 * 3600;
						break;
					case "day":
						divNum = 1000 * 3600 * 24;
						break;
					default:
						break;
				}
				let diff = parseInt((eTime.getTime() - sTime.getTime()) / parseInt(divNum));
				
				return diff > 0 ? diff : 0;
			},
			
			/* 
			 * 获得两个日期之间的周次数
			 * startDate : 开始日期（时间格式为 yyyy-MM-dd 例如：2021-09-01）
			 * endDate : 结束日期（时间格式为 yyyy-MM-dd 例如：2022-06-28）
			 */
			getWeekDiff : function(startDate, endDate) {
				// 开始日期的周一
				let startDateTime = new Date(startDate);
				let weekFirstDay = new Date(startDateTime - (startDateTime.getDay() - 1) * 86400000);
				
				// 计算周次
				let date1 = new Date(weekFirstDay);
				let date2 = new Date(endDate);
				
				let dt1 = date1.getTime();
				let dt2 = date2.getTime();
				// 向上取整
				return Math.ceil(Math.abs(dt1 - dt2) / 1000 / 60 / 60 / 24 / 7);
			},
			
			/**
			 * 格式化时间戳
			 *     timestamp ：时间戳，支持秒和毫秒
			 *     fmt       : 格式化。 例如：yyyy-MM-dd HH:mm:ss
			 */
			dateFormat : function(timestamp, fmt) {
				if (info.ifnull(timestamp) == "") {
					return "";
				}
				
				let date = null;
				if (/^\d+$/.test(timestamp)) {
					date = (String(timestamp).length>10) ? new Date(Number(timestamp)) : new Date(Number(timestamp) * 1000);
				} else {
					date = new Date(timestamp);
				}
				return doDateFormat(date, fmt);
				
				/**
				 * 时间格式化
				 */
				function doDateFormat(date, fmt) {
					let o = { 
						"M+" : date.getMonth()+1, //月份
						"d+" : date.getDate(), //日
						"h+" : date.getHours()%12 == 0 ? 12 : date.getHours()%12, //小时
						"H+" : date.getHours(), //小时
						"m+" : date.getMinutes(), //分
						"s+" : date.getSeconds(), //秒
						"q+" : Math.floor((date.getMonth()+3)/3), //季度
						"S" : date.getMilliseconds() //毫秒
					}; 
					let week = { 
						"0" : "/u65e5", 
						"1" : "/u4e00", 
						"2" : "/u4e8c", 
						"3" : "/u4e09", 
						"4" : "/u56db", 
						"5" : "/u4e94", 
						"6" : "/u516d"
					};
					if (/(y+)/.test(fmt)) {
						fmt = fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
					} 
					if (/(E+)/.test(fmt)) {
						fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "")+week[date.getDay()+""]);
					} 
					for (var k in o) {
						if (new RegExp("("+ k +")").test(fmt)) {
							fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
						}
					}

					return fmt;
				}
			},
			
			/* 
			 * 修改时间显示
			 * time : 传入的时间，格式yyyy-MM-dd HH:mm:ss
			 */
			changeTimeText : function(time) {
				let timeText = time;
				let now = info.now();
				let day = info.getTimeDiff(time, now, "day");
				if (day>6) {
					// 直接显示返回的时间，不改变
				} else if (day>0) {
					// 修改为几天前
					if (day==1) {
						timeText = "昨天 " + time.split(" ")[1];
					} else if (day==2) {
						timeText = "前天 " + time.split(" ")[1];
					} else {
						timeText = day + " 天前";
					}
				} else if (day==0) {
					let hour = info.getTimeDiff(time, now, "hour");
					if (hour>0) {
						timeText = hour + " 小时前";
					} else if (hour==0) {
						let minute = info.getTimeDiff(time, now, "minute");
						if (minute>0) {
							timeText = minute + " 分钟前";
						} else if (minute==0) {
							let second = info.getTimeDiff(time, now, "second");
							timeText = second + " 秒前";
						}
					}
				}
				
				return timeText;
			},
			
			/* 
			 * 修改时间显示
			 * selector : jquery选择器，例如    ".change-time"
			 */
			changeTimeTexts : function(selector) {
				// 当前系统时间
				let now = info.now();
				// 修改时间显示
				$(selector).each(function() {
					if (isNaN($(this).text()) && !isNaN(Date.parse($(this).text()))) {
						let day = info.getTimeDiff($(this).text(), now, "day");
						if (day>6) {
							// 直接显示返回的时间，不改变
						} else if (day>0) {
							// 修改为几天前
							if (day==1) {
								$(this).text("昨天 " + $(this).text().split(" ")[1]);
							} else if (day==2) {
								$(this).text("前天 " + $(this).text().split(" ")[1]);
							} else {
								$(this).text(day + " 天前");
							}
						} else if (day==0) {
							let hour = info.getTimeDiff($(this).text(), now, "hour");
							if (hour>0) {
								$(this).text(hour + " 小时前");
								$(this).addClass("highlight-color");
							} else if (hour==0) {
								let minute = info.getTimeDiff($(this).text(), now, "minute");
								if (minute>0) {
									$(this).text(minute + " 分钟前");
									$(this).addClass("highlight-color");
								} else if (minute==0) {
									let second = info.getTimeDiff($(this).text(), now, "second");
									$(this).text(second + " 秒前");
									$(this).addClass("highlight-color");
								}
							}
						}
					}
				});
			},
			
			/**
			 * 将null转为空字符串
			 */
			ifnull : function(str, replaceValue) {
				if (typeof str === "number") {
					return str;
				}
				
				if (replaceValue === undefined) {
					return (!str || str=="undefined") ? "" : str;
				} else {
					return (!str || str=="undefined") ? replaceValue : str;
				}
			},
			
			/**
			 * cookie
			 */
			deleteCookie : function(key) {
				let exp = new Date();
				exp.setTime(exp.getTime() - 1);
				let cval = info.getCookie(key);
				if (cval!=null) {
					document.cookie = key + "=" + cval + "; path=/; expires=" + exp.toGMTString();
				}
			},
			getCookie : function(key) {
				let strArr = document.cookie.split("; ");
				for (let i=0; i<strArr.length; i++) {
					let temp = strArr[i].split("=");
					if (temp[0]==key) {
						return unescape(temp[1]);
					}
				}
				return "";
			},
			setCookie : function(key, value, time) {
				if (value.constructor === Object) {
					value = JSON.stringify(value);
				}
				if (!time) {
					document.cookie = key + "=" + escape(value) + "; path=/; expires=-1";
				} else {
					let days = parseInt(time);
					let exp = new Date();
					exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);
					document.cookie = key + "=" + escape(value) + "; path=/; expires=" + exp.toGMTString();
				}
			},
			
			/**
			 * localStorage
			 */
			deleteLocalStorage : function(key) {
				if (!!key) {
					localStorage.removeItem(key);
				} else {
					localStorage.clear();
				}
			},
			getLocalStorage : function(key) {
				return localStorage.getItem(key);
			},
			setLocalStorage : function(key, value) {
				if (value.constructor === Object) {
					value = JSON.stringify(value);
				}
				localStorage.setItem(key, value);
			},
			
			/**
			 * sessionStorage
			 */
			deleteSessionStorage : function(key) {
				if (!!key) {
					sessionStorage.removeItem(key);
				} else {
					sessionStorage.clear();
				}
			},
			getSessionStorage : function(key) {
				return sessionStorage.getItem(key);
			},
			setSessionStorage : function(key, value) {
				if (value.constructor === Object) {
					value = JSON.stringify(value);
				}
				sessionStorage.setItem(key, value);
			},
			
			/**
			 * 判断字符串是否是JSON格式
			 */
			isJSON : function(str) {
				if (typeof str === "string") {
					try {
						var obj = JSON.parse(str);
						if (typeof obj === "object" && obj) {
							return true;
						} else {
							return false;
						}
					} catch(e) {
						return false;
					}
				}
				
				return false;
			},
			
			/**
			 * 判断是否是IE内核
			 */
			isIE : function() {
				// ie
				if (!!window.ActiveXobject || "ActiveXObject" in window) {
					return true;
				}
				// ie11
				if((/Trident\/7\./).test(navigator.userAgent)) {
					return true;
				}
				return false;
			},
			
			/**
			 * Popup 弹出层
			 */
			popup : function(args) {
				const target = {
					id : "",
					position : "center",
					mask : "black",
					closeOnClickMask : true,
					closeable : false,
					closeIconPosition : "top-right",
					close : function() {return true;},
					opend : function() {return true;}
				};
				const settings = Object.assign(target, defaults(args));
				
				let $popup = $("#"+settings.id);
				let position = settings.position;
				
				closeCallback = settings.close;
				
				// 判断是否添加遮罩
				if (settings.mask!="") {
					if (settings.mask=="black") {
						$popup.before('<div class="javaex-mask"></div>');
					} else if (settings.mask=="transparent") {
						$popup.before('<div class="javaex-mask-transparent"></div>');
					}
				}
				
				if (settings.closeable) {
					$popup.prepend('<div class="javaex-popup-close-icon javaex-popup-close-icon-'+settings.closeIconPosition+'" onclick="javaex.closePopup(\''+settings.id+'\', \''+position+'\', closeCallback)"><i class="javaex-icon icon-close"></i></div>');
				}
				
				// 弹出弹层
				switch(position) {
					case "center":
						$popup.show();
						break;
					case "top":
						$popup.css("transform", "translateY(-100%)");
						$popup.show();
						$popup.css("transform", "translateY(0)");
						break;
					case "bottom":
						$popup.css("transform", "translateY(100%)");
						$popup.show();
						$popup.css("transform", "translateY(0)");
						break;
					case "left":
						$popup.css("transform", "translateX(-100%)");
						$popup.show();
						$popup.css("transform", "translateX(0)");
						break;
					case "right":
						$popup.css("transform", "translateX(100%)");
						$popup.show();
						$popup.css("transform", "translateX(0)");
						break;
					default:
						break;
				}
				// 弹出层打开后的回调函数
				settings.opend({});
				
				// 点击遮罩隐藏
				if (settings.mask!="" && settings.closeOnClickMask) {
					$(".javaex-mask, .javaex-mask-transparent").click(function() {
						info.closePopup(settings.id, position, closeCallback);
					});
				}
			},
			closePopup : function(id, position, fn) {
				if (fn()!=false) {
					let $popup = $("#"+id);
					
					switch(position) {
						case "center":
							$popup.hide();
							break;
						case "top":
							$popup.css("transform", "translateY(-100%)");
							break;
						case "bottom":
							$popup.css("transform", "translateY(100%)");
							break;
						case "left":
							$popup.css("transform", "translateX(-100%)");
							break;
						case "right":
							$popup.css("transform", "translateX(100%)");
							break;
						default:
							break;
					}

					$(".javaex-mask").remove();
					$(".javaex-mask-transparent").remove();
				}
			},
			
			/**
			 * guideNav 引导导航
			 */
			guideNav : function(args) {
				const target = {
					id : ""
				};
				const settings = Object.assign(target, defaults(args));
				
				let id = settings.id;
				
				// 点击...
				$("#"+id+" ul .more").click(function() {
					// 为子级 ul 添加和去除 active 属性
					if ($("#"+id+" > ul").hasClass("active")) {
						$("#"+id+" > ul").removeClass("active");
						$("#"+id+" ul").css("height", "0.42rem");
					} else {
						// 查询 li 的个数
						var liCount = $("#"+id+" > ul > li").length;
						// 判断可以分成几行 2.1表示视为3
						var row = Math.ceil((liCount+1)/5);
						$("#"+id+" > ul").addClass("active");
						// 设置高度
						$("#"+id+" ul.active").css("height", (row*0.42) + "rem");
					}
				});
				
				// 点击导航
				$("#"+id+" ul li a").click(function() {
					$("#"+id+" > ul li").removeClass("active");
					$(this).parent("li").addClass("active");
				});
			},
			
			/**
			 * BottomMenu 底部菜单
			 */
			bottomMenu : function(args) {
				const target = {
					id : ""
				};
				const settings = Object.assign(target, defaults(args));
				
				let id = settings.id;
				
				$("#"+id+" .javaex-menu-box").click(function() {
					// 如果当前菜单为激活状态
					if ($(this).hasClass("active")) {
						// 则隐藏其子菜单
						$(this).children(".javaex-bottommenu-submenu").hide();
						$("#"+id+" .javaex-menu-box").removeClass("active");
					} else {
						// 否则的话，先关闭其他兄弟菜单的子菜单
						$("#"+id+" .javaex-menu-box").removeClass("active");
						$("#"+id+" .javaex-menu-box").children(".javaex-bottommenu-submenu").slideUp("fast");
						// 再激活当前菜单
						$(this).addClass("active");
						$(this).children(".javaex-bottommenu-submenu").slideDown("fast");
					}
				});
			},
			
			/**
			 * OptMenu 操作菜单
			 */
			optMenu : function(args) {
				const target = {
					title : "",
					menus : []
				};
				const settings = Object.assign(target, defaults(args));
				
				let id = info.getUUID();
				
				let html = '';
				// 生成菜单html代码
				let json = settings.menus;
				let menuHtml = '';
				
				for (var key in json) {
					menuHtml += '<li><a class="javaex-optmenu-button" onclick="javaex.close(\''+id+'\');'+json[key]+';">'+key+'</a></li>';
				}
				
				html = '<div id='+id+' class="javaex-optmenu" style="display: none;">';
				if (settings.title!="") {
					html += '<div class="javaex-optmenu-title">'+settings.title+'</div>';
				}
				html += '<ul class="javaex-vertical">';
				html += menuHtml;
				html += '</ul>';
				html += '<div class="javaex-optmenu-sheetgap"></div>';
				html += '<button type="button" class="javaex-optmenu-sheet-cancel" onclick="javaex.closeTranslate(\''+id+'\');">取消</button>';
				html += '</div>';
				
				$(document.body).append(html);
				
				// 添加遮罩
				$("#"+id).before('<div class="javaex-mask"></div>');
				// 显示弹出层
				$("#"+id).show();
				$("#"+id).addClass("javaex-modal-in");
				
				// 点击遮罩隐藏
				$(".javaex-mask").click(function() {
					$(".javaex-mask").remove();
					$("#"+id).css("transform", "translateY(100%)");
					setTimeout(function() {
						info.close(id);
					}, 300);
				});
			},
			closeTranslate : function(id) {
				$(".javaex-mask").remove();
				$("#"+id).css("transform", "translateY(100%)");
				setTimeout(function() {
					info.close(id);
				}, 300);
			},
			
			/**
			 * Tabs 选项卡切换
			 */
			tab : function(args) {
				const target = {
					id : "",
					current : 1,
					mode : "",
					isInit : false,
					callback : function() {return true;}
				};
				const settings = Object.assign(target, defaults(args));
				
				let id = settings.id;
				let current = parseInt(settings.current);
				let index = current - 1;
				
				// 初始化返回回调函数，返回选项卡的索引，从1开始计
				if (settings.isInit) {
					settings.callback({
						"index": current
					});
				}
				
				// 添加下划线
				$("#"+id+ " .javaex-tabs-nav").append('<div class="javaex-tabs-bottom-line"></div>');
				// 为当前选中的选项卡添加选中属性
				$("#"+id+" .javaex-tabs-nav").children("div:eq(" + index + ")").addClass("active");
				// 每个选项卡的宽度
				let oneTabWidth = $("#"+id+ " .javaex-tabs-nav .javaex-tab").eq(0).width() + 8;
				// tab底线的滑动距离
				// baseTranslateX：第一个滑动的距离
				let baseTranslateX = oneTabWidth / 2;
				// 初始化底线的滑动距离
				let translateXpx = (baseTranslateX + oneTabWidth * index) + "px";
				$("#"+id+" .javaex-tabs-bottom-line").css({transform: "translateX("+translateXpx+") translateX(-50%)"});
				
				// 内容侧滑
				if (settings.mode=="slide") {
					$("#"+id+" .javaex-swipe-track").addClass("clear");
					$("#"+id+" .javaex-swipe-track .javaex-tab-panel").addClass("fl");
					
					let tabObj = document.getElementById(id);
					let tabPanelObjs = document.querySelectorAll("#"+id+" .javaex-tabs-content .javaex-tab-panel");
					// 设置大容器的宽度
					$("#"+id+" .javaex-swipe-track").width(tabPanelObjs.length * tabObj.offsetWidth + "px");
					
					// 设置每一个内容区域的宽度
					for (let i=0; i<tabPanelObjs.length; i++) {
						tabPanelObjs[i].style.width = tabObj.offsetWidth + "px";
					};
					
					let $swipeTrack = $("#"+id+" .javaex-swipe-track");
					let leftX = -index * tabObj.offsetWidth + "px";
					$swipeTrack.css({
						"margin-left" : leftX
					});
					
					// tab切换事件
					$("#"+id+" .javaex-tabs-nav .javaex-tab").click(function() {
						let translateXpx = (baseTranslateX + oneTabWidth * $(this).index()) + "px";
						$("#"+id+" .javaex-tabs-bottom-line").css({transform: "translateX("+translateXpx+") translateX(-50%)"});
						// 给标题添加样式
						$(this).addClass("active").siblings().removeClass("active");

						let indexLeftX = -$(this).index() * tabObj.offsetWidth + "px";
						$swipeTrack.stop().animate({
							"margin-left" : indexLeftX
						});
						// 为其他组件触发图片懒加载机制
						$(window).trigger("scroll");
						
						// 设置回调函数，返回选项卡的索引，从1开始计
						settings.callback({
							"index": $(this).index() + 1
						});
					});
				}
				// 默认形式
				else {
					// 显示当前选中的选项卡的内容，隐藏其他选项卡的内容
					$("#"+id+" .javaex-tabs-content").children("div:eq(" + index + ")").show().siblings().hide();
					
					// tab切换事件
					$("#"+id+" .javaex-tabs-nav .javaex-tab").click(function() {
						let translateXpx = (baseTranslateX + oneTabWidth * $(this).index()) + "px";
						$("#"+id+" .javaex-tabs-bottom-line").css({transform: "translateX("+translateXpx+") translateX(-50%)"});
						// 给标题添加样式
						$(this).addClass("active").siblings().removeClass("active");
						$("#"+id+" .javaex-tabs-content").children("div:eq(" + $(this).index() + ")").show().siblings().hide();

						// 为其他组件触发图片懒加载机制
						$(window).trigger("scroll");
						
						// 设置回调函数，返回选项卡的索引，从1开始计
						settings.callback({
							"index": $(this).index() + 1
						});
					});
				}
			},
			
			/**
			 * TabSelect 分类选择
			 */
			tabSelect : function(args) {
				const target = {
					id : "",
					current : 1,
					isInit : false,
					callback : function() {return true;}
				};
				const settings = Object.assign(target, defaults(args));
				
				let id = settings.id;
				let current = parseInt(settings.current);
				let index = current - 1;
				
				// 初始化返回回调函数，返回选项卡的索引，从1开始计
				if (settings.isInit) {
					settings.callback({
						"index": current
					});
				}
				
				// 为当前选中的选项卡添加选中属性
				$("#"+id+" .javaex-tab-select-nav").children("div:eq(" + index + ")").addClass("javaex-sidebar-item-select");
				// 显示当前选中的选项卡的内容，隐藏其他选项卡的内容
				$("#"+id+" .javaex-tab-select-content").children("div:eq(" + index + ")").show().siblings().hide();

				// tab切换事件
				$("#"+id+" .javaex-sidebar-item").click(function() {
					// 给标题添加样式
					$(this).addClass("javaex-sidebar-item-select").siblings().removeClass("javaex-sidebar-item-select");
					$("#"+id+" .javaex-tab-select-content").children("div:eq(" + $(this).index() + ")").show().siblings().hide();

					// 为其他组件触发图片懒加载机制
					$(window).trigger("scroll");

					// 设置回调函数，返回选项卡的索引，从1开始计
					settings.callback({
						"index": $(this).index() + 1
					});
				});
			},
  			
			/**
			 * Radio 单选框
			 */
			radio : function() {
				$(":radio[fill]").each(function() {
					// 判断是否已经渲染过了
					if ($(this).hasClass("javaex-rendered")) {
						return true;
					} else {
						$(this).addClass("javaex-rendered");
					}
					
					let text = "";
					
					// 判断用户是否自己包裹了一层LABEL
					if ($(this).parent()[0].tagName=="LABEL") {
						$(this).parent().addClass("javaex-fill-label");
						// 先获取input之后的文本，保存起来
						text = $(this)[0].nextSibling.nodeValue;
						// 清空input之后的文本
						$(this)[0].nextSibling.nodeValue = "";
					} else {
						// 先获取input之后的文本，保存起来
						text = $(this)[0].nextSibling.nodeValue;
						// 清空input之后的文本
						$(this)[0].nextSibling.nodeValue = "";
						// 为input创建父节点
						$(this).wrap('<label class="javaex-fill-label"></label>');
					}
					
					if (!!text) {
						// 重新追加之前保存的input之后的文本
						text = text.replace(/(\s*$)/g, "");
						if (text.length==0) {
							$(this).parent().append('<span></span>');
						} else {
							$(this).parent().append('<span class="javaex-fill-text">' + text + '</span>');
						}
					}
					// 判断是否已存在span标签
					if ($(this).siblings().length==1) {
						$(this).after('<span class="javaex-fill-css"></span>');
					}
				});
				
				$(":radio[cell]").each(function() {
					// 判断是否已经渲染过了
					if ($(this).hasClass("javaex-rendered")) {
						return true;
					} else {
						$(this).addClass("javaex-rendered");
					}
					
					let text = "";
					
					// 判断用户是否自己包裹了一层LABEL
					if ($(this).parent()[0].tagName=="LABEL") {
						$(this).parent().addClass("javaex-radiocell-label full clear");
						// 先获取input之后的文本，保存起来
						text = $(this)[0].nextSibling.nodeValue;
						// 清空input之后的文本
						$(this)[0].nextSibling.nodeValue = "";
					} else {
						// 先获取input之后的文本，保存起来
						text = $(this)[0].nextSibling.nodeValue;
						// 清空input之后的文本
						$(this)[0].nextSibling.nodeValue = "";
						// 为input创建父节点
						$(this).wrap('<label class="javaex-radiocell-label full clear"></label>');
					}
					
					if (!!text) {
						// 重新追加之前保存的input之后的文本
						text = text.replace(/(\s*$)/g, "");
						if (text.length==0) {
							$(this).parent().append('<span></span>');
						} else {
							$(this).parent().append('<span class="javaex-radiocell-text">' + text + '</span>');
						}
					}
					// 判断是否已存在span标签
					if ($(this).siblings().length==1) {
						$(this).after('<span class="javaex-radiocell-css javaex-icon icon-check fr"></span>');
					}
				});
			},
			
			/**
			 * 伪单选
			 */
			fakeRadio : function(args) {
				const target = {
					name : "",
					uncheckClass : "",
					checkedClass : "",
					isInit : false,
					callback : function() {return true;}
				};
				const settings = Object.assign(target, defaults(args));

				let name = settings.name;
				let uncheckClass = settings.uncheckClass;
				let checkedClass = settings.checkedClass;
				
				$(':radio[name="'+name+'"]').each(function() {
					if ($(this).is(":checked")) {
						$(this).closest("label").addClass(checkedClass);
						if (settings.isInit) {
							settings.callback({
								"val" : $(this).val(),
								"text" : $(this)[0].nextSibling.nodeValue
							});
						}
					} else {
						$(this).closest("label").addClass(uncheckClass);
					}
				});
				
				$(':radio[name="'+name+'"]').change(function() {
					$(':radio[name="'+name+'"]').each(function() {
						$(this).closest("label").removeClass(checkedClass).addClass(uncheckClass);
					});
					$(this).closest("label").removeClass(uncheckClass).addClass(checkedClass);
					settings.callback({
						"val" : $(this).val(),
						"text" : $(this)[0].nextSibling.nodeValue
					});
				});
			},
			
			/**
			 * 复选框
			 */
			checkbox : function() {
				$(":checkbox[fill]").each(function() {
					// 判断是否已经渲染过了
					if ($(this).hasClass("javaex-rendered")) {
						return true;
					} else {
						$(this).addClass("javaex-rendered");
					}
					
					let text = "";
					
					// 判断用户是否自己包裹了一层LABEL
					if ($(this).parent()[0].tagName=="LABEL") {
						$(this).parent().addClass("javaex-fill-label javaex-checkbox-label");
						// 先获取input之后的文本，保存起来
						text = $(this)[0].nextSibling.nodeValue;
						// 清空input之后的文本
						$(this)[0].nextSibling.nodeValue = "";
					} else {
						// 先获取input之后的文本，保存起来
						text = $(this)[0].nextSibling.nodeValue;
						// 清空input之后的文本
						$(this)[0].nextSibling.nodeValue = "";
						// 为input创建父节点
						$(this).wrap('<label class="javaex-fill-label javaex-checkbox-label"></label>');
					}
					
					if (!!text) {
						// 重新追加之前保存的input之后的文本
						text = text.replace(/(\s*$)/g, "");
						if (text.length==0) {
							$(this).parent().append('<span></span>');
						} else {
							$(this).parent().append('<span class="javaex-fill-text">' + text + '</span>');
						}
					}
					
					// 判断是否已存在span标签
					if ($(this).siblings().length==1) {
						$(this).after('<span class="javaex-fill-css icon-check"></span>');
					}
				});
				
				$(":checkbox[cell]").each(function() {
					// 判断是否已经渲染过了
					if ($(this).hasClass("javaex-rendered")) {
						return true;
					} else {
						$(this).addClass("javaex-rendered");
					}
					
					let text = "";
					
					// 判断用户是否自己包裹了一层LABEL
					if ($(this).parent()[0].tagName=="LABEL") {
						$(this).parent().addClass("javaex-checkboxcell-label full clear");
						// 先获取input之后的文本，保存起来
						text = $(this)[0].nextSibling.nodeValue;
						// 清空input之后的文本
						$(this)[0].nextSibling.nodeValue = "";
					} else {
						// 先获取input之后的文本，保存起来
						text = $(this)[0].nextSibling.nodeValue;
						// 清空input之后的文本
						$(this)[0].nextSibling.nodeValue = "";
						// 为input创建父节点
						$(this).wrap('<label class="javaex-checkboxcell-label full clear"></label>');
					}
					
					if (!!text) {
						// 重新追加之前保存的input之后的文本
						text = text.replace(/(\s*$)/g, "");
						if (text.length==0) {
							$(this).parent().append('<span></span>');
						} else {
							$(this).parent().append('<span class="javaex-checkboxcell-text">' + text + '</span>');
						}
					}
					
					// 判断是否已存在span标签
					if ($(this).siblings().length==1) {
						$(this).after('<span class="javaex-checkboxcell-css javaex-icon icon-check fr"></span>');
					}
				});
			},
			
			/**
			 * 监听复选框的点击事件
			 */
			checkboxCheck : function($this) {
				if ($this.is(":checked")) {
					$this.parent(".javaex-checkbox-label").addClass("javaex-checkbox-checked");
				} else {
					$this.parent(".javaex-checkbox-label").removeClass("javaex-checkbox-checked");
				}

				let listen = $this.attr("listen");
				if (listen === undefined) {
					return true;
				}

				// 提取key
				let listenKey = listen.replace(listen.split("-")[0]+"-", "");
				let keyArr = listenKey.split("-");

				// 判断当前点击的复选框的选中状态
				if ($this.is(":checked")) {
					// 当前级别的复选框的选中个数
					let num = 0;
					// 选中时
					$(":checkbox").each(function() {
						let listenNext = $(this).attr("listen");
						if (listenNext === undefined) {
							return true;
						}

						// 让子级复选框全部选中
						if (listenNext!=listen && listenNext.indexOf(listen)>=0) {
							// 跳过禁用的
							if (!$(this).attr("disabled")) {
								$(this).prop("checked", true);
								$(this).parent(".javaex-checkbox-label").addClass("javaex-checkbox-checked");

								// 设置选择图标为对勾（树形菜单专用）
								$(this).next("span.icon-stop").removeClass("icon-stop").addClass("icon-check");
							}
						}
						if (listenNext==listen) {
							if ($(this).is(":checked") || $(this).attr("disabled")) {
								num++;
							}
						}
					});

					// 判断当前级别的复选框是否已全部选中
					if (num == $('[listen="'+listen+'"]').length) {
						// 自动选中父级
						let parentListen = listen.replace("-" + keyArr[keyArr.length - 1], "");
						if ((parentListen.split("-").length - 1) == 1) {
							// 遍历listen-X-?
							let flag = true;
							for (let i=1; i<=10; i++) {
								let temp = parentListen + "-" + i;
								if ($('[listen="'+temp+'"]').length>0 && !$('[listen="'+temp+'"]').is(":checked")) {
									flag = false;
								}
							}

							if (flag) {
								$(":checkbox").each(function() {
									if ($(this).attr("listen") == parentListen) {
										$(this).prop("checked", true);
										$(this).parent(".javaex-checkbox-label").addClass("javaex-checkbox-checked");
										return false;
									}
								});
							}
						} else {
							$(":checkbox").each(function() {
								if ($(this).attr("listen") == parentListen) {
									$(this).prop("checked", true);
									$(this).parent(".javaex-checkbox-label").addClass("javaex-checkbox-checked");
									return false;
								}
							});

							parentListen = parentListen.substring(0, parentListen.length - 2);
							let flag = true;
							for (let i=1; i<=10; i++) {
								let temp = parentListen + "-" + i;
								if ($('[listen="'+temp+'"]').length.length>0 && !$('[listen="'+temp+'"]').length.is(":checked")) {
									flag = false;
								}
							}
							if (flag) {
								$(":checkbox").each(function() {
									if ($(this).attr("listen") == parentListen) {
										$(this).prop("checked", true);
										$(this).parent(".javaex-checkbox-label").addClass("javaex-checkbox-checked");
										return false;
									}
								});
							}
						}
					}
				}
				// 未选中时
				else {
					$(":checkbox").each(function() {
						let listenNext = $(this).attr("listen");
						if (listenNext === undefined) {
							return true;
						}

						// 让子级复选框全部取消选中
						if (listenNext!=listen && listenNext.indexOf(listen)>=0) {
							$(this).prop("checked", false);
							$(this).parent(".javaex-checkbox-label").removeClass("javaex-checkbox-checked");
						}
						// 让父级复选框全部取消选中
						let parentListen = "listen";
						for (let i=0; i<keyArr.length; i++) {
							if (keyArr[i] != keyArr[keyArr.length - 1]) {
								parentListen += "-";
								parentListen += keyArr[i];
								if (listenNext==parentListen) {
									$(this).prop("checked", false);
									$(this).parent(".javaex-checkbox-label").removeClass("javaex-checkbox-checked");
								}
							}
						}
					});
				}
			},
			listenCheckbox : function(args) {
				const target = {
					callback : function() {return true;}
				};
				const settings = Object.assign(target, defaults(args));
				
				$(document).on("click", ":checkbox", function() {
					info.checkboxCheck($(this));
					settings.callback({});
				});
			},
			
			/**
			 * 伪多选
			 */
			fakeCheckbox : function(args) {
				const target = {
					name : "",
					uncheckClass : "",
					checkedClass : ""
				};
				const settings = Object.assign(target, defaults(args));
				
				let name = settings.name;
				let uncheckClass = settings.uncheckClass;
				let checkedClass = settings.checkedClass;
				
				$(':checkbox[name="'+name+'"]').each(function() {
					if ($(this).is(":checked")) {
						$(this).parent("label").addClass(checkedClass);
					} else {
						$(this).parent("label").addClass(uncheckClass);
					}
				});
				
				$(':checkbox[name="'+name+'"]').change(function() {
					if ($(this).is(":checked")) {
						$(this).closest("label").removeClass(uncheckClass).addClass(checkedClass);
					} else {
						$(this).closest("label").removeClass(checkedClass).addClass(uncheckClass);
					}
				});
			},
			
			/**
			 * 计数器
			 */
			inputNumber : function(args) {
				const target = {
					id : "",
					initValue : "",
					step : 1,
					minValue : 1,
					maxValue : 100,
					decrCallback : function() {return true;},
					incrCallback : function() {return true;}
				};
				const settings = Object.assign(target, defaults(args));

				const id = settings.id;
				const $inputNumber = $("#"+id);
				let step = settings.step;
				let minValue = settings.minValue;
				let maxValue = settings.maxValue;
				
				let initValue = settings.initValue;
				if (!initValue) {
					initValue = $inputNumber.val();
				}
				$inputNumber.val(initValue);
				
				//添加左右加减号
				let wrapId = "javaex-inputNumber-wrap-" + id;
				let leftId = "javaex-inputNumber-left-" + id;
				let rightId = "javaex-inputNumber-right-" + id;
				
				$inputNumber.wrap('<div id="'+wrapId+'" class="javaex-inputNumber-wrap"></div>');
				$inputNumber.before('<span id="'+leftId+'" class="javaex-inputNumber-left" onselectstart="return false;">-</span>');
				$inputNumber.after('<span id="'+rightId+'" class="javaex-inputNumber-right" onselectstart="return false;">+</span>');
				
				// 点击减号
				$("#"+leftId).click(function() {
					let inputValue = $inputNumber.val();
					inputValue = Number(inputValue);
					let newValue = inputValue - step;
					if (newValue>=minValue) {
						$inputNumber.val(newValue);
						settings.decrCallback({
							"val" : newValue
						});
					}
				});
				
				// 点击加号
				$("#"+rightId).click(function() {
					let inputValue = $inputNumber.val();
					inputValue = Number(inputValue);
					let newValue = inputValue + step;
					if (newValue<=maxValue) {
						$inputNumber.val(newValue);
						settings.incrCallback({
							"val" : newValue
						});
					}
				});
			},
			
			/**
			 * 评分
			 */
			rate : function(args) {
				const target = {
					id : "",
					num : 5,
					size : "0.3rem",
					scoreArr : [1, 2, 3, 4, 5],
					levelTextArr : ['1分', '2分', '3分', '4分', '5分'],
					score : null,
					isReadOnly : false,
					half : false,
					clickOnce : false,
					callback : function() {return true;}
				};
				const settings = Object.assign(target, defaults(args));
				
				const id = settings.id;
				let num = parseInt(settings.num);
				let scoreArr = settings.scoreArr;
				let isReadOnly = settings.isReadOnly;
				let half = settings.half;
				let levelTextArr = settings.levelTextArr;
				
				// 填充代码
				let liHtml = '<ul>';
				for (let i=1; i<=num; i++) {
					if (half) {
						liHtml += '<li index="'+i+'" score="'+scoreArr[i-1]+'" tooltip-pos="up"><i class="javaex-rate-star icon-star_border" style="font-size:'+settings.size+';"></i></li>';
					} else {
						liHtml += '<li index="'+i+'" score="'+scoreArr[i-1]+'" tooltip-pos="up"><i class="javaex-rate-star icon-star_border" style="font-size:'+settings.size+';"></i></li>';
					}
				}
				liHtml += '</ul>';
				$("#"+id).empty();
				$("#"+id).append(liHtml);
				
				// 评分等级改变函数
				let scoreChange = function(elem, index, halfFlag) {
					return $(elem).each(function(i, scoreElem) {
						return $(scoreElem).find("i").each(function(i, item) {
							if (i<index) {
								$(item).removeClass("icon-star_border");
								$(item).removeClass("icon-star_half");
								return $(item).addClass("icon-star");
							}
							else if (i==index) {
								$(item).removeClass("icon-star_border");
								if (halfFlag) {
									$(item).removeClass("icon-star");
									$(item).addClass("icon-star_half");
								} else {
									$(item).removeClass("icon-star_half");
									$(item).addClass("icon-star");
								}
							}
							else {
								$(item).removeClass("icon-star");
								$(item).removeClass("icon-star_half");
								return $(item).addClass("icon-star_border");
							}
						});
					});
				};
				
				// 默认分数
				let score = settings.score;
				if (!!score) {
					$("#"+id+" li").each(function() {
						let tempScore = Math.ceil(score);    // 只比较整数，所以这里向上取整来比较
						let halfFlag = false;
						if (half) {
							// 小数点大于0.7就全星，否则就半星
							if ((Math.ceil(score) - score) <= 0.3) {
								halfFlag = false;
							} else {
								halfFlag = true;
							}
						} else {
							// 如果没有选择半星的属性，却给了小数的数值，统一向上
							score = (Math.ceil(score) - score) < 0.5 ? Math.ceil(score): Math.floor(score);
						}
						
						if ($(this).attr("score")==tempScore) {
							$("#"+id).addClass("active");
							
							let index = $(this).attr("index");
							
							scoreChange($("#"+id), index-1, halfFlag);
							return false;
						}
					});
				}
				
				// 判断是否只读
				if (!isReadOnly) {
					// 鼠标滑过时
					$("#"+id+" li").each(function() {
						let $this = $(this);
						
						// 鼠标在li标签上滑动
						$this.mousemove(function(e) {
							let index = $(this).attr("index") | 0;
							if (parseInt(index)<=0) {
								return false;
							}
							
							// 判断半星
							let halfFlag = false;
							if (half) {
								if ((e.pageX - $(this).offset().left) <= $(this).width()/2) {
									halfFlag = true;
									$(this).attr("tooltip", levelTextArr[index*2 - 2])
								} else {
									$(this).attr("tooltip", levelTextArr[index*2 - 1])
								}
							} else {
								$(this).attr("tooltip", levelTextArr[index - 1])
							}
							
							return scoreChange($("#"+id), index-1, halfFlag);
						});
					});
					
					// 点击评分
					$("#"+id+" li").click(function(e) {
						// 判断半星
						let halfFlag = false;
						if (half) {
							if ((e.pageX - $(this).offset().left) <= $(this).width()/2) {
								halfFlag = true;
							}
						}
						
						let index = $(this).attr("index") | 0;
						if (parseInt(index)<=0) {
							return;
						}
						
						$("#"+id).attr("active", index);
						scoreChange($("#"+id), index-1, halfFlag);
						
						let score = parseInt($(this).attr("score"));
						if (halfFlag) {
							score = score - 0.5;
						}
						
						settings.callback({
							"index" : index,
							"score" : score
						});
						
						if (settings.clickOnce) {
							args.isReadOnly = true;
							args.score = score;
							info.rate(args);
						}
					});
				}
			},
			
			/**
			 * 点击按钮的回调函数
			 */
			callback : function(id, fn) {
				if (fn()!=false) {
					info.close(id);
				}
			},
			/**
			 * 关闭弹出层
			 */
			close : function(id) {
				$(".javaex-mask").remove();
				$(".javaex-mask-transparent").remove();
				$(".javaex-toast").remove();
				
				if (!!id) {
					$("#"+id).remove();
				}
			},
			
			/**
			 * 确定弹框
			 */
			alert : function(args) {
				const target = {
					id : info.getUUID(),
					type : "",
					title : "",
					content : "",
					confirmName : "确定",
					confirm : function() {return true;},
					opend : function() {return true;}
				};
				const settings = Object.assign(target, defaults(args));
				confirmFn = settings.confirm;
				
				let html = '';
				if ("button"==settings.type) {
					html = `<div class="javaex-mask">
								<div class="javaex-container">
									<div id="{{id}}" class="javaex-dialog javaex-animated-zoom-in">
										<div class="javaex-dialog-header">{{title}}</div>
										<div class="javaex-dialog-content">
											<div class="javaex-dialog-message javaex-dialog-message-has-title">{{content}}</div>
										</div>
										<div class="javaex-dialog-footer javaex-dialog-type-button">
											<button class="javaex-button-default javaex-dialog-confirm javaex-btn danger" block round onclick="{{confirmFnClick}}">
												<div class="javaex-button-content"><span class="javaex-button-text">{{confirmName}}</span></div>
											</button>
										</div>
									</div>
								</div>
							</div>`;
				} else {
					html = `<div class="javaex-mask">
								<div class="javaex-container">
									<div id="{{id}}" class="javaex-dialog javaex-animated-zoom-in">
										<div class="javaex-dialog-header">{{title}}</div>
										<div class="javaex-dialog-content">
											<div class="javaex-dialog-message javaex-dialog-message-has-title">{{content}}</div>
										</div>
										<div class="javaex-hairline-top javaex-dialog-footer">
											<button class="javaex-button-default javaex-dialog-confirm" onclick="{{confirmFnClick}}">
												<div class="javaex-button-content"><span class="javaex-button-text">{{confirmName}}</span></div>
											</button>
										</div>
									</div>
								</div>
							</div>`;
				}
				
				html = html.replace(/{{id}}/, settings.id);
				html = html.replace(/{{title}}/, settings.title);
				html = html.replace(/{{content}}/, settings.content);
				html = html.replace(/{{confirmName}}/, settings.confirmName);
				html = html.replace(/{{confirmFnClick}}/, 'javaex.callback(\''+settings.id+'\', confirmFn)');
				
				$(document.body).append(html);
				
				settings.opend({});
			},

			/**
			 * 确认选择弹框
			 */
			confirm : function(args) {
				const target = {
					id : info.getUUID(),
					type : "",
					title : "",
					content : "",
					confirmName : "确定",
					cancelName : "取消",
					confirm : function() {return true;},
					cancel : function() {return true;},
					opend : function() {return true;}
				};
				const settings = Object.assign(target, defaults(args));
				confirmFn = settings.confirm;
				cancelFn = settings.cancel;
				
				let html = '';
				if ("button"==settings.type) {
					html = `<div class="javaex-mask">
								<div class="javaex-container">
									<div id="{{id}}" class="javaex-dialog javaex-animated-zoom-in">
										<div class="javaex-dialog-header">{{title}}</div>
										<div class="javaex-dialog-content">
											<div class="javaex-dialog-message javaex-dialog-message-has-title">{{content}}</div>
										</div>
										<div class="javaex-dialog-footer javaex-dialog-type-button">
											<button class="javaex-button-default javaex-dialog-cancel javaex-btn mr-10" block round plain onclick="{{cancelFnClick}}">
												<div class="javaex-button-content"><span class="javaex-button-text">{{cancelName}}</span></div>
											</button>
											<button class="javaex-button-default javaex-dialog-confirm javaex-hairline-left javaex-btn ml-10" block round onclick="{{confirmFnClick}}">
												<div class="javaex-button-content"><span class="javaex-button-text">{{confirmName}}</span></div>
											</button>
										</div>
									</div>
								</div>
							</div>`;
				} else {
					html = `<div class="javaex-mask">
								<div class="javaex-container">
									<div id="{{id}}" class="javaex-dialog javaex-animated-zoom-in">
										<div class="javaex-dialog-header">{{title}}</div>
										<div class="javaex-dialog-content">
											<div class="javaex-dialog-message javaex-dialog-message-has-title">{{content}}</div>
										</div>
										<div class="javaex-hairline-top javaex-dialog-footer">
											<button class="javaex-button-default javaex-dialog-cancel" onclick="{{cancelFnClick}}">
												<div class="javaex-button-content"><span class="javaex-button-text">{{cancelName}}</span></div>
											</button>
											<button class="javaex-button-default javaex-dialog-confirm javaex-hairline-left" onclick="{{confirmFnClick}}">
												<div class="javaex-button-content"><span class="javaex-button-text">{{confirmName}}</span></div>
											</button>
										</div>
									</div>
								</div>
							</div>`;
				}
				
				html = html.replace(/{{id}}/, settings.id);
				html = html.replace(/{{title}}/, settings.title);
				html = html.replace(/{{content}}/, settings.content);
				html = html.replace(/{{cancelName}}/, settings.cancelName);
				html = html.replace(/{{confirmName}}/, settings.confirmName);
				html = html.replace(/{{confirmFnClick}}/, 'javaex.callback(\''+settings.id+'\', confirmFn)');
				html = html.replace(/{{cancelFnClick}}/, 'javaex.callback(\''+settings.id+'\', cancelFn)');
				
				$(document.body).append(html);
				
				settings.opend({});
			},
			
			/**
			 * Toast 吐司
			 */
			toast : function(args) {
				const target = {
					id : info.getUUID(),
					type : "",
					content : "",
					icon : "",
					bottom : "",
					hasMask : true,
					live : 2000
				};
				const settings = Object.assign(target, defaults(args));
				
				let id = settings.id;
				let type = settings.type;
				
				// 弹出层代码
				let html = '';
				if (settings.hasMask) {
					html += '<div class="javaex-mask-transparent"></div>';
				}
				if (type=="loading") {
					html += '<div id="'+id+'" class="javaex-toast">';
					html += '	<div class="javaex-loading javaex-toast-loading">';
					html += '		<span class="javaex-loading-spinner javaex-loading-spinner-circular">';
					html += '			<svg class="javaex-loading-circular" viewBox="25 25 50 50"><circle cx="50" cy="50" r="20" fill="none"></circle></svg>';
					html += '		</span>';
					html += '	</div>';
					html += '	<div class="javaex-toast-text">'+settings.content+'</div>';
					html += '</div>';
				} else if (type=="success") {
					html += '<div id="'+id+'" class="javaex-toast"><i class="javaex-toast-icon javaex-icon icon-check"></i><div class="javaex-toast-text">'+settings.content+'</div></div>';
				} else if (type=="error") {
					html += '<div id="'+id+'" class="javaex-toast"><i class="javaex-toast-icon javaex-icon icon-close"></i><div class="javaex-toast-text">'+settings.content+'</div></div>';
				} else if (type=="info") {
					html += '<div id="'+id+'" class="javaex-toast"><i class="javaex-toast-icon javaex-icon '+settings.icon+'"></i><div class="javaex-toast-text">'+settings.content+'</div></div>';
				} else if (type=="message") {
					if (settings.bottom=="") {
						html += '<div id="'+id+'" class="javaex-message-toast javaex-message-toast-center">';
					} else {
						html += '<div id="'+id+'" class="javaex-message-toast javaex-message-toast-center javaex-message-toast-base" style="bottom:'+settings.bottom+'">';
					}
					html += '	<div class="javaex-message-toast-inner">';
					html += '		<div class="javaex-message-toast-text">'+settings.content+'</div>';
					html += '	</div>';
					html += '</div>';
				}
				
				$(".javaex-mask-transparent").remove();
				$(".javaex-toast").remove();
				$(".javaex-message-toast").remove();
				$(document.body).append(html);
				
				if (parseInt(settings.live)>0 && type!="loading") {
					setTimeout(function() {
						$(".javaex-mask-transparent").remove();
						$("#"+id).remove();
					}, settings.live);
				}
			},
			
			// select选择框
			firstIndex : 0,	// 第一个可见项的索引
			lastIndex  : 0,	// 最后一个可见项的索引
			isSearchInit : false,	// 是否搜索过后就没再次滚动
			select : function(args) {
				const target = {
					id : "",
					title : "",
					closeOnClickMask : true,
					searchable : false,
					searchPlaceholder : "请输入搜索关键词",
					searchMode : 1,
					callback : function() {return true;}
				};
				const settings = Object.assign(target, defaults(args));
				let selectId = settings.id;
				
				// 判断是否已经存在input元素
				let obj = document.getElementById("input-"+selectId);
				if (obj==null) {
					$("#"+selectId).before('<input id="input-'+selectId+'" class="javaex-field-control javaex-select-inputval" type="text" placeholder="点击选择" style="cursor: pointer;" value="" readonly />');
				}
				// 将select框隐藏起来
				$("#"+selectId).hide();
				
				// select选择框面板代码
				let html = '';
				html += '<div id="select-box-'+selectId+'" class="javaex-popup javaex-popup-bottom" round style="display: none;">';
				html += '	<div class="javaex-select-bar">';
				html += '		<div id="select-cancel-'+selectId+'" class="javaex-select-cancel javaex-select-left javaex-select-button">取消</div>';
				html += '		<div class="javaex-select-title">'+settings.title+'</div>';
				html += '		<div id="select-ok-'+selectId+'" class="javaex-select-confirm javaex-select-right javaex-select-button">确认</div>';
				html += '	</div>';

				if (settings.searchable) {
					html += '<div class="javaex-search-bar">';
					html += '	<form id="javaex-searchbar-form-'+selectId+'" action="" class="javaex-search-input-area" onsubmit="return false;">';
					html += '		<i class="javaex-icon icon-search"></i>';
					html += '		<input type="search" id="javaex-searchinput-'+selectId+'" autocomplete="off" placeholder="'+settings.searchPlaceholder+'" />';
					html += '		<i class="javaex-icon icon-cancel" onclick="javaex.selectSearchClear(this, \''+selectId+'\')" style="display: none;"></i>';
					html += '	</form>';
					html += '</div>';
				}
				
				html += '	<div class="javaex-select-column">';
				html += '		<div id="opt-select-'+selectId+'" class="javaex-select-columnitem">';
				html += '			<ul class="javaex-select-ul" style="transform: translate(0px, 0px);transition: all 0.3s;"></ul>';
				html += '		</div>';
				html += '	</div>';
				html += '</div>';

				$(document.body).append(html);
				$("#select-box-"+selectId+" ul").after('<div id="mask-data-'+selectId+'" class="javaex-select-mask-data"><div class="javaex-select-mask-up"></div><div class="javaex-select-mask-mid"></div><div class="javaex-select-mask-down"></div></div>');
				
				// 是否显示搜索框
				if (settings.searchable) {
					let searchMode = parseInt(settings.searchMode);
					// 即时搜索
					if (searchMode==1) {
						$('#javaex-searchbar-form-'+selectId+' input[type="search"]').bind("input propertychange", function() {
							info.selectSearch(selectId);
						});
					}
					// 按回车搜索
					else {
						$('#javaex-searchbar-form-'+selectId+' input[type="search"]').bind("keydown",function (e) {
							if (13 === e.keyCode) {
								info.selectSearch(selectId);
							} else {
								$(this).parent().find(".icon-cancel").show();
							}
						});
					}
				}
				
				var isStart = true;
				var isMove = false;
				var isEnd = false;
				var startY = 0; // 当前触摸时的Y坐标
				var lastY = 0;	// 上一次触摸时的Y坐标
				var nowElement = null;	// 当前滚动的ul
				var liLength = 0;		// 当前滚动的ul下的li数量
				var nY = 0;
				var mY = 0;
				var endY = 0;
				var maxY = 0;
				var minY = 0;
				var nowY = 0;
				var liHeight = $(".javaex-select-mask-mid").height();
				
				// 用于缓动的变量
				var lastMoveTime = 0;
				var lastMoveStart = 0;
				var totalDistance = 0;		// 移动总距离
				var stopInertiaMove = false;// 是否停止缓动
				
				// 判断select是否已有默认值
				var selectValue = $("#"+selectId).val();
				var selectName = "";
				
				init();
				close(true);
				
				// 绑定select选择框的点击事件
				$("#input-"+selectId).bind("click", function() {
					init();
					// 显示select选择框
					$("#select-box-"+selectId).before('<div class="javaex-mask"></div>');
					$("#select-box-"+selectId).css("transform", "translateY(100%)");
					$("#select-box-"+selectId).show();
					$("#select-box-"+selectId).css("transform", "translateY(0)");
					
					// 是否允许点击遮罩关闭
					if (settings.closeOnClickMask) {
						$(".javaex-mask").click(function() {
							close();
						});
					}
					return;
				});
				
				// select选择确定按钮的点击事件
				$("#select-ok-"+selectId).bind("click", function() {
					close(true);
					return;
				});
				// select选择关闭按钮的点击事件
				$("#select-cancel-"+selectId).bind("click", function() {
					close();
					return;
				});
				
				/**
				 * select选择初始化
				 */
				function init() {
					// 清空列表的内容
					$("#opt-select-"+selectId+" ul").empty();
					// 为列表添加内容
					$("#opt-select-"+selectId+" ul").html($("#"+selectId).html());
					// 添加属性
					$("#opt-select-"+selectId+" option").addClass("javaex-select-option option-show");
					// 选中默认值
					$("#opt-select-"+selectId+" option").each(function() {
						if ($(this).attr("value")==selectValue) {
							let positionY = -($(this).index()-3)*liHeight;
							$(this).parent().css("transform", "translate(0, "+positionY+"px)");
							return false;
						}
					});
					// 关闭select选择框，并把结果回显到页面
					selectName =$("#"+selectId).find("option:selected").text();
					
					// 初始化第一个索引和最后一个索引
					info.firstIndex = 0;
					info.lastIndex = $("#opt-select-"+selectId+" ul option").length - 1;
				}
				
				// 绑定滚动事件
				var oScroll = document.getElementById("mask-data-"+selectId);
				// 当手指触摸屏幕时候触发，即使已经有一个手指放在屏幕上也会触发
				oScroll.addEventListener("touchstart", function (event) {
					event.preventDefault();

					// 记录当前触摸时的Y坐标
					startY = event.touches[0].clientY;
					// 记录上一次触摸时的Y坐标
					lastY = startY;
					nowElement = $(this).prev(".javaex-select-ul");
					liLength = nowElement.find(".option-show").length;
					nY = getTranslateY(nowElement);
					if (!isMove&&isEnd) {
						return false;
					}
					isStart = false;
					isMove = false;

					// 缓动代码
					lastMoveStart = lastY;
					lastMoveTime = new Date().getTime();
					stopInertiaMove = true;
				}, false);

				// 当手指在屏幕上滑动的时候连续地触发。在这个事件发生期间，调用preventDefault()事件可以阻止滚动
				oScroll.addEventListener("touchmove", function (event) {
					event.preventDefault();

					mY = event.touches[0].clientY;
					if (!isStart) {
						isMove = true;
						isEnd = true;
					}
					if (isMove) {
						nowElement.css("transition", "none");
						nowElement.css("transform", "translate(0, "+-(nY-(mY-startY))+"px)");
					}

					// 缓动代码
					var nowTime = new Date().getTime();
					stopInertiaMove = true;
					if ((nowTime - lastMoveTime)>300) {
						lastMoveTime = nowTime;
						lastMoveStart = mY;
					}
				}, false);

				// 当手指从屏幕上离开的时候触发
				oScroll.addEventListener("touchend", function (event) {
					event.preventDefault();

					endY = event.changedTouches[0].clientY;
					maxY = liHeight * 3;
					minY = -($(this).prev("ul").find(".option-show").length-4) * liHeight;

					if (isEnd) {
						isMove = false;
						isEnd = false;
						isStart = true;
						nY = -(nY-(mY-startY));
						nowY = endY;

						// 修正位置
						if (nY>maxY) {
							nowElement.css("transition", "all .3s");
							nowElement.css("transform", "translate(0, "+maxY+"px)");
						} else if (nY<minY) {
							nowElement.css("transition", "all .3s");
							nowElement.css("transform", "translate(0, "+minY+"px)");
						} else {
							// 缓动代码
							var endTime = new Date().getTime();
							//最后一段时间手指划动速度
							var v = (nowY-lastMoveStart)/(endTime-lastMoveTime);
							stopInertiaMove = false;
							(function(v, lastMoveTime, contentY) {
								// 加速度方向
								var dir = v > 0 ? -1 : 1;
								// 减速率 0.0006 为减速时间
								var deceleration = dir*0.0006;
								function inertiaMove() {
									if (stopInertiaMove) {
										return;
									}
									var nowTime = new Date().getTime();
									var t = nowTime - lastMoveTime;
									// 当前速度
									var nowV = v + t * deceleration;
									var moveY = (v + nowV) / 3 * t;
									// 减速停止过程
									if (dir*nowV>0) {
										// 移动总距离大于最大值时，修正回弹
										if (totalDistance>maxY) {
											nowElement.css("transition", "all .3s");
											nowElement.css("transform", "translate(0, "+maxY+"px)");
										} else if (totalDistance<minY) {
											// 同上，修正回弹
											nowElement.css("transition", "all .3s");
											nowElement.css("transform", "translate(0, "+minY+"px)");
										} else {
											nowElement.css("transition", "all .3s");
											nowElement.css("transform", "translate(0, "+Math.round(totalDistance/liHeight)*liHeight+"px)");
										}
										// 获取值
										setTimeout(function() {
											setSelectValue();
										}, 300);
										return;
									}
									// 当前移动距离
									totalDistance = contentY + moveY;
									if (totalDistance>(maxY+(liHeight*3))) {
										nowElement.css("transition", "all .4s");
										nowElement.css("transform", "translate(0, "+maxY+"px)");
										return;
									} else if (totalDistance<(minY-(liHeight*3))) {
										nowElement.css("transition", "all .4s");
										nowElement.css("transform", "translate(0, "+minY+"px)");
										return;
									}
									nowElement.css("transform", "translate(0, "+totalDistance+"px)");
									// 获取值
									setTimeout(function() {
										setSelectValue();
									}, 300);
									setTimeout(inertiaMove, 10);
								}
								inertiaMove();
							})(v, endTime, nY);
						}

						// 获取值
						setTimeout(function() {
							setSelectValue();
						}, 300);
					}
				}, false);
				
				function getTranslateY(element) {
					let matrix = $(element).css("transform");
					let translateY = 0;
					if (matrix!="none") {
						let arr = matrix.split(",");
						translateY = -(arr[5].split(")")[0]);
					}
					return translateY;
				}
				
				/**
				 * 获取值
				 */
				function setSelectValue() {
					let currentY = 0;
					$("#opt-select-"+selectId+" .javaex-select-ul").each(function(index) {
						currentY = getTranslateY(this);
						let value = "";
						let name = "";
						if (currentY==0) {
							value = $($(this).find(".javaex-select-option")[3]).attr("value");
							name = $($(this).find(".javaex-select-option")[3]).text();
						} else {
							value = $($(this).find(".javaex-select-option")[Math.round(currentY/liHeight)+3]).attr("value");
							name = $($(this).find(".javaex-select-option")[Math.round(currentY/liHeight)+3]).text();
						}
						if (index==0) {
							selectValue = value;
							selectName = name;
						}
						info.isSearchInit = false;
					});
				}

				/**
				 * 关闭select选择框
				 * isOk : 判断是否是点击确定按钮关闭的 
				 */
				function close(isOk) {
					if (isOk) {
						// 如果是检索过后就没再次滚动选择，就默认取第一条数据
						if (info.isSearchInit) {
							selectValue = $($("#opt-select-"+selectId+" .javaex-select-ul").find(".javaex-select-option")[info.firstIndex]).attr("value");
							selectName = $($("#opt-select-"+selectId+" .javaex-select-ul").find(".javaex-select-option")[info.firstIndex]).text();
						}
						// 把值显示到页面
						$("#"+selectId).val(selectValue);
						if (selectValue=="") {
							$("#input-"+selectId).val("");
						} else {
							$("#input-"+selectId).val(selectName);
						}
						
						// 解除错误状态
						$("#"+selectId).parent().parent().find(".javaex-field-error-message").remove();
						
						// 回调函数
						settings.callback({
							"selectValue": selectValue,
							"selectName" : selectName
						});
					}
					// 隐藏select框
					$(".javaex-mask").remove();
					$("#select-box-"+selectId).css("transform", "translateY(100%)");
					setTimeout(function() {
						$("#select-box-"+selectId).css("display", "none");
					}, 300);
				}
			},
			selectSearch : function(selectId) {
				let keyword = $("#javaex-searchinput-"+selectId).val();
				let count = 0;
				let indexArr = new Array();	// 记录符合检索条件的索引
				
				// 如果检索内容为空
				keyword = keyword.replace(/(^\s*)|(\s*$)/g, "");
				
				if (keyword=="") {
					// 则显示所有选项
					$("#opt-select-"+selectId+" ul option").removeClass("option-hide").addClass("option-show");
				} else {
					$('#javaex-searchbar-form-'+selectId).find(".icon-cancel").show();
					
					// 遍历匹配每一个选项
					$("#opt-select-"+selectId+" ul option").each(function(i) {
						// 因为indexOf()方法对大小写敏感，所以这里强制转化为小写后再匹配
						// 如果当前选项不匹配
						if ($(this).text().toLowerCase().indexOf(keyword.toLowerCase())==-1) {
							$(this).removeClass("option-show").addClass("option-hide");
							count++;
						} else {
							$(this).removeClass("option-hide").addClass("option-show");
							// 记录下当前的索引
							indexArr.push(i);
						}
					});

					// 重新滚动
					if (indexArr!=null) {
						$("#opt-select-"+selectId+" .javaex-select-ul").css("transition", "all 0s");
						let positionY = 0;
						let liHeight = $(".javaex-select-mask-mid").height();
						info.firstIndex = indexArr[0];	// 第一条被检索到的索引
						info.lastIndex = indexArr[indexArr.length-1];	// 最后一条被检索到的索引
						$("#opt-select-"+selectId+" .javaex-select-ul").css("transform", "translate(0, "+-(info.firstIndex-3)*liHeight+"px)");
						info.isSearchInit = true;
					}
				}
			},
			selectSearchClear : function(obj, selectId) {
				$("#javaex-searchinput-"+selectId).val("");
				$(obj).hide();
				// 显示所有选项
				$("#opt-select-"+selectId+" ul option").removeClass("option-hide").addClass("option-show");
			},
			
			/**
			 * FormFill 表单自动填充
			 */
			form : function(args) {
				const target = {
					id : "",
					formData : {},
					defaultRadioChecked : 1,
					callback : function() {return true;}
				};
				const settings = Object.assign(target, defaults(args));
				
				let formData = settings.formData;
				let defaultRadioChecked = parseInt(settings.defaultRadioChecked);
				
				if (formData==null) {
					return;
				}
				
				let $form = $("#"+settings.id);
				
				// 遍历json得到键值对
				for (let key in formData) {
					let value = formData[key];
					
					// 获取对应的元素
					let $item = $form.find('[name="'+ key +'"]');
					if ($item.length==0) {
						continue;
					}
					// 获取对应的元素类型
					let type = $item[0].type;
					
					switch (type) {
						case "checkbox":
							value = value==null ? "" : value;
							if (typeof value === "number") {
								value = String(value);
							}
							value = value.split(",");
							
							for (let i=0; i<value.length; i++) {
								$form.find(':checkbox[name="'+key+'"][value="'+value[i]+'"]').prop("checked", true);
							}
							break;
						case "radio":
							$form.find(':radio[name="'+key+'"][value="'+value+'"]').prop("checked", true);
							
							// 如果没有值，默认选中
							if (!$form.find(':radio[name="'+key+'"]:checked').val() && defaultRadioChecked>0) {
								$form.find(':radio[name="'+key+'"]').each(function(i) {
									if ((i+1) == defaultRadioChecked) {
										$(this).prop("checked", true);
										return false;
									}
								});
							}
							break;
						case "select-one":
							let selectId = $item.attr("id");
							if (!!selectId) {
								$("#input-"+selectId).val(info.getSelectText("#"+selectId));
								if (!!value) {
									$item.val(value);
								}
							}
							break;
						default:
							if (!!value || value==0) {
								$item.val(value);
							}
							break;
					}
				}
				
				// 回调函数
				settings.callback({});
			},
			
			/**
			 * ImagePreview 图片预览
			 */
			imagePreview : function(args) {
				const target = {
					type : "image",
					url : "",
					opend : function() {return true;}
				};
				const settings = Object.assign(target, defaults(args));
				
				let html = '';
				html += '<div class="javaex-mask javaex-imagepreview"><img src="'+settings.url+'" /></div>';
				$(document.body).append(html);
				
				// 打开后的回调函数
				settings.opend({});
				
				// 点击遮罩隐藏
				$(".javaex-mask").click(function() {
					$(".javaex-mask").remove();
				});
			},
			
			/**
			 * Lazyload 图片懒加载
			 */
			lazyload : function(args) {
				const target = {
					selector : "",
					threshold : 100,
					event : "scroll",
					container : window,
					dataOriginal : "data-original",
					appear : null,
					load : null,
					placeholder : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
				};
				let settings = Object.assign(target, defaults(args));
				
				let selector = settings.selector;
				let elements = $(selector);
				let effect = settings.effect;
				if (!effect) {
					effect = "fadeIn";
				}
				
				// 强制初始检查图像是否应显示
				$(document).ready(function() {
					$(settings.container).trigger(settings.event);
					checkImage();
				});
				// 窗口调整大小时重新检查
				$(window).bind("resize", function() {
					checkImage();
				});
				
				// 将容器缓存为jquery作为对象
				let $container = (settings.container === undefined || settings.container === window) ? $(window) : $(settings.container);
				
				// 每个滚动触发一个滚动事件
				if (0 === settings.event.indexOf("scroll")) {
					$container.bind(settings.event, function() {
						return checkImage();
					});
				}
				
				elements.each(function() {
					let self = this;
					let $self = $(self);
					
					self.loaded = false;
					
					// 如果没有给定的src属性
					if (!$self.attr("src")) {
						if ($self.is("img")) {
							$self.attr("src", settings.placeholder);
						}
					}
					
					// 当触发显示时，加载原始图像
					$self.one("appear", function() {
						if (!this.loaded) {
							if (settings.appear) {
								let elements_left = elements.length;
								settings.appear.call(self, elements_left, settings);
							}
							$("<img />").bind("load", function() {
								let original = $self.attr(settings.dataOriginal);
								$self.hide();
								if ($self.is("img")) {
									$self.attr("src", original);
								} else {
									$self.css("background-image", "url('" + original + "')");
								}
								$self[effect](400);
								
								self.loaded = true;
								// 删除占位属性
								$self.removeAttr(settings.dataOriginal);
								
								// 从数组中删除图像，以便下次不循环
								let temp = $.grep(elements, function(element) {
									return !element.loaded;
								});
								elements = $(temp);
								
								if (settings.load) {
									let elements_left = elements.length;
									settings.load.call(self, elements_left, settings);
								}
							}).attr("src", $self.attr(settings.dataOriginal));
						}
					});
					
					$(window).trigger("scroll");
				});
				
				/**
				 * 检查图像是否应显示
				 */
				function checkImage() {
					let counter = 0;
					
					elements.each(function() {
						let $this = $(this);
						// 跳过隐藏图片
						if (!$this.is(":visible")) {
							return;
						}
						if (abovethetop(this, settings) || leftofbegin(this, settings)) {
							// 无操作
						} else if (!belowthefold(this, settings) && !rightoffold(this, settings)) {
							$this.trigger("appear");
							// 如果找到要加载的图像，请重置计数器
							counter = 0;
						} else {
							if (++counter > 0) {
								return false;
							}
						}
					});
				}
				
				// 在窗口下方
				function belowthefold(element, settings) {
					let fold;
					
					if (settings.container === undefined || settings.container === window) {
						fold = (window.innerHeight ? window.innerHeight : $(window).height()) + $(window).scrollTop();
					} else {
						fold = $(settings.container).offset().top + $(settings.container).height();
					}
					
					return fold <= $(element).offset().top - settings.threshold;
				};
				// 在窗口右方
				function rightoffold(element, settings) {
					let fold;
					
					if (settings.container === undefined || settings.container === window) {
						fold = $(window).width() + $(window).scrollLeft();
					} else {
						fold = $(settings.container).offset().left + $(settings.container).width();
					}
					
					return fold <= $(element).offset().left - settings.threshold;
				};
				// 在窗口上方
				function abovethetop(element, settings) {
					let fold;
					
					if (settings.container === undefined || settings.container === window) {
						fold = $(window).scrollTop();
					} else {
						fold = $(settings.container).offset().top;
					}
					
					return fold >= $(element).offset().top + settings.threshold  + $(element).height();
				};
				// 在窗口左方
				function leftofbegin(element, settings) {
					let fold;
					
					if (settings.container === undefined || settings.container === window) {
						fold = $(window).scrollLeft();
					} else {
						fold = $(settings.container).offset().left;
					}
					
					return fold >= $(element).offset().left + settings.threshold + $(element).width();
				};
			},
			
			/**
			 * BackTop 返回顶部
			 */
			backTop : function(args) {
				const target = {
					id : ""
				};
				const settings = Object.assign(target, defaults(args));
				const $backTop = $("#"+settings.id);
				$backTop.hide();
				
				// 回到顶部
				$backTop.click(function() {
					$("body, html").animate({scrollTop:0}, 500);
				});
				
				$(window).scroll(function() {
					let sc = $(window).scrollTop();
					if (sc>300) {
						$backTop.show();
					} else {
						$backTop.hide();
					}
				});
			},
			
			/**
			 * Progress 进度条
			 */
			progress : function(args) {
				const target = {
					id : "",
					mode : "",
					percent : 0,
					width : 5,
					isShowPercent : false
				};
				const settings = Object.assign(target, defaults(args));
				
				let percent = parseInt(settings.percent);
				let $progress = $("#"+settings.id);
				
				// 环形进度条
				if (settings.mode=="circle") {
					let dasharray = 283 / 100 * percent + "px";
					let progressSVG = '<svg viewBox="0 0 100 100"><defs><linearGradient x1="100%" y1="0%" x2="0%" y2="0%"></linearGradient></defs>\
						<path class="javaex-circleprogress-path" d="M 50 50 m 0 -45 a 45 45 0 1 1 0 90 a 45 45 0 1, 1 0 -90" fill="none" stroke-width="{{strokeWidth}}"> > </path>\
						<path class="javaex-circleprogress-hover" d="M 50 50 m 0 -45 a 45 45 0 1 1 0 90 a 45 45 0 1, 1 0 -90" fill="none" stroke stroke-linecap="round" stroke-width="{{strokeWidth}}" style="stroke-dasharray: 0, 283px;"></path>\
					</svg>';
					// 自定义宽度
					progressSVG = progressSVG.replace(/{{strokeWidth}}/g, parseInt(settings.width));
					
					// 判断是否是首次加载
					if ($progress.find(".javaex-circleprogress-hover").length == 0) {
						if (settings.isShowPercent) {
							$progress.html(progressSVG + '<span class="javaex-circleprogress-text">'+percent+'%</span>');
						} else {
							$progress.html(progressSVG);
						}

						setTimeout(function() {
							$progress.find(".javaex-circleprogress-hover").css({
								"stroke-dasharray" : ""+dasharray+", 283px"
							});
						}, 10);
					} else {
						if (settings.isShowPercent) {
							$progress.html(progressSVG + '<span class="javaex-circleprogress-text">'+percent+'%</span>');
						} else {
							$progress.html(progressSVG);
						}

						$progress.find(".javaex-circleprogress-hover").css({
							"stroke-dasharray" : ""+dasharray+", 283px"
						});
					}
				}
				// 线形进度条
				else {
					if (settings.isShowPercent) {
						$progress.html("<span>"+percent+"%</span>");
					} else {
						$progress.html(" ");
					}
					
					if ($progress.width() < 1) {
						$progress.css({
							"width" : percent+"%",
							"transition" : "width 0.8s 0.1s"
						});
					} else {
						$progress.css({
							"width" : percent+"%"
						});
					}
				}
			},
			
			/**
			 * DatePicker 日期选择器
			 */
			date : function(args) {
				const target = {
					id : "",
					title : "",
					time : "",
					closeOnClickMask : true,
					callback : function() {return true;}
				};
				const settings = Object.assign(target, defaults(args));
				var dateId = settings.id;
				
				if (settings.time=="today") {
					settings.time = info.getToday();
				}
				
				// 创建数据
				var now = new Date();
				// 年
				var yearList = '';
				for (let i=1900; i<=parseInt(now.getFullYear()+50); i++) {
					yearList += '<li class="javaex-picker-roller-item-tile date-show">'+i+'年</li>';
				}
				// 月
				var monthList = '';
				for (let i=1; i<=12; i++) {
					if (i<10) {
						i = "0" + i;
					}
					monthList += '<li class="javaex-picker-roller-item-tile date-show">'+i+'月</li>';
				}
				// 日
				var dayList = '';
				for (let i=1; i<=31; i++) {
					if (i<10) {
						i = "0" + i;
					}
					dayList += '<li class="javaex-picker-roller-item-tile date-show">'+i+'日</li>';
				}

				// 日期选择器面板代码
				let html = '<div id="date-box-'+dateId+'" class="javaex-popup javaex-popup-bottom" round style="display: none;">\
								<div class="javaex-picker-bar">\
									<div id="picker-cancel-'+dateId+'" class="javaex-picker-cancel javaex-picker-left javaex-picker-button">取消</div>\
									<div class="javaex-picker-title">'+settings.title+'</div>\
									<div id="picker-ok-'+dateId+'" class="javaex-picker-confirm javaex-picker-right javaex-picker-button">确认</div>\
								</div>\
								<input type="hidden" id="javaex-picker-value-'+dateId+'" value=""/>\
								<div class="javaex-picker-column">\
									<div class="javaex-picker-columnitem">\
										<ul id="year-'+dateId+'" class="javaex-picker-list" style="transform: translate(0px, 0px);transition: all 0.3s;"></ul>\
									</div>\
									<div class="javaex-picker-columnitem">\
										<ul id="month-'+dateId+'" class="javaex-picker-list" style="transform: translate(0px, 0px);transition: all 0.3s;"></ul>\
									</div>\
									<div class="javaex-picker-columnitem">\
										<ul id="day-'+dateId+'" class="javaex-picker-list" style="transform: translate(0px, 0px);transition: all 0.3s;"></ul>\
									</div>\
								</div>\
							</div>';

				$(document.body).append(html);
				// 添加遮罩
				$("#date-box-"+dateId+" ul").after('<div class="javaex-picker-mask-data"><div class="javaex-picker-mask-up"></div><div class="javaex-picker-mask-mid"></div><div class="javaex-picker-mask-down"></div></div>');

				var isStart = true;
				var isMove = false;
				var isEnd = false;
				var startY = 0; // 当前触摸时的Y坐标
				var lastY = 0;	// 上一次触摸时的Y坐标
				var nowElement = null;	// 当前滚动的ul
				var liLength = 0;		// 当前滚动的ul下的li数量
				var nY = 0;
				var mY = 0;
				var endY = 0;
				var maxY = 0;
				var minY = 0;
				var nowY = 0;
				var liHeight = $(".javaex-picker-mask-mid").height();

				var year = "";
				var month = "";
				var day = "";

				// 用于缓动的变量
				var lastMoveTime = 0;
				var lastMoveStart = 0;
				var totalDistance = 0;		// 移动总距离
				var stopInertiaMove = false;// 是否停止缓动
				
				// 初始化
				init();
				
				if (settings.time=="" || settings.time==null || settings.time==undefined) {

				} else {
					// 关闭日期选择框，并把结果回显到输入框
					close(true);
				}

				// 绑定日期框的点击事件
				$("#"+dateId).css({
					"cursor" : "pointer"
				});
				$("#"+dateId).bind("click", function() {
					// 显示日期框
					$("#date-box-"+dateId).before('<div class="javaex-mask"></div>');
					$("#date-box-"+dateId).css("transform", "translateY(100%)");
					$("#date-box-"+dateId).show();
					$("#date-box-"+dateId).css("transform", "translateY(0)");

					// 是否允许点击遮罩关闭
					if (settings.closeOnClickMask) {
						$(".javaex-mask").click(function() {
							close();
						});
					}
					return;
				});
				// 日期选择确定按钮的点击事件
				$("#picker-ok-"+dateId).bind("click", function() {
					close(true);
					
					// 设置回调函数，返回一个时间对象，包含所选日期
					settings.callback({
						"date": $("#javaex-picker-value-"+dateId).val()
					});
					return;
				});
				// 日期选择关闭按钮的点击事件
				$("#picker-cancel-"+dateId).bind("click", function() {
					close();
					return;
				});

				/**
				 * 日期选择初始化
				 */
				function init() {
					// 为列表添加内容
					$("#year-"+dateId).html(yearList);
					$("#month-"+dateId).html(monthList);
					$("#day-"+dateId).html(dayList);

					// 判断是否已经选择过日期了
					let timestamp = $("#javaex-picker-value-"+dateId).val();
					if (timestamp=="" || timestamp==null || timestamp==undefined) {
						// 判断用户是否自定义了日期
						if (settings.time=="" || settings.time==null || settings.time==undefined) {
							// 不变，默认显示系统日期
						} else {
							// 分割年月日
							let arr = settings.time.split("-");
							// 返回日期格式
							now = new Date(arr[0], arr[1]-1, arr[2]);
						}
					} else {
						// 返回日期格式
						now = new Date(timestamp*1);
					}

					year = now.getFullYear();
					month = ((now.getMonth() + 1) < 10 ? "0" : "") + (now.getMonth() + 1);
					day = (now.getDate() < 10 ? "0" : "") + now.getDate();
					
					// 获取当前月应该有多少天
					let curMonthDays = new Date(year, month, 0).getDate();
					let dif = curMonthDays-31;
					// 隐藏多余的天数
					if (dif<0) {
						let moveY = getTranslateY($("#day-"+dateId));
						for (var i=0; i>dif; i--) {
							$("#day-"+dateId+" li:eq("+[31-1+i]+")").removeClass("date-show").addClass("date-hide");
						}
					}

					// 默认选择年月日
					$("#year-"+dateId+" li").each(function() {
						if (parseInt($(this).text())==parseInt(year)) {
							let positionY = -($(this).index()-3)*liHeight;
							$(this).parent().css("transform", "translate(0, "+positionY+"px)");
							return false;
						}
					});
					$("#month-"+dateId+" li").each(function() {
						if (parseInt($(this).text())==parseInt(month)) {
							let positionY = -($(this).index()-3)*liHeight;
							$(this).parent().css("transform", "translate(0, "+positionY+"px)");
							return false;
						}
					});
					$("#day-"+dateId+" li").each(function() {
						if (parseInt($(this).text())==parseInt(day)) {
							let positionY = -($(this).index()-3)*liHeight;
							$(this).parent().css("transform", "translate(0, "+positionY+"px)");
							return false;
						}
					});
					
					// 填充时间
					$("#javaex-picker-value-"+dateId).val(year + "-" + month + "-" + day);
				}

				// 绑定滚动事件
				var oScrollList = document.querySelectorAll("#date-box-"+dateId+" .javaex-picker-mask-data");
				for (var i=0; i<oScrollList.length; i++) {
					// 当手指触摸屏幕时候触发，即使已经有一个手指放在屏幕上也会触发
					oScrollList[i].addEventListener("touchstart", function (event) {
						event.preventDefault();

						// 记录当前触摸时的Y坐标
						startY = event.touches[0].clientY;
						// 记录上一次触摸时的Y坐标
						lastY = startY;
						nowElement = $(this).prev("ul");
						liLength = nowElement.find(".date-show").length;
						nY = getTranslateY(nowElement);
						if (!isMove && isEnd) {
							return false;
						}
						isStart = false;
						isMove = false;

						// 缓动代码
						lastMoveStart = lastY;
						lastMoveTime = new Date().getTime();
						stopInertiaMove = true;
					}, false);

					// 当手指在屏幕上滑动的时候连续地触发。在这个事件发生期间，调用preventDefault()事件可以阻止滚动
					oScrollList[i].addEventListener("touchmove", function (event) {
						event.preventDefault();

						mY = event.touches[0].clientY;
						if (!isStart) {
							isMove = true;
							isEnd = true;
						}
						if (isMove) {
							nowElement.css("transition", "none");
							nowElement.css("transform", "translate(0, "+-(nY-(mY-startY))+"px)");
						}

						// 缓动代码
						var nowTime = new Date().getTime();
						stopInertiaMove = true;
						if ((nowTime - lastMoveTime)>300) {
							lastMoveTime = nowTime;
							lastMoveStart = mY;
						}
					}, false);

					// 当手指从屏幕上离开的时候触发
					oScrollList[i].addEventListener("touchend", function (event) {
						event.preventDefault();

						endY = event.changedTouches[0].clientY;
						maxY = liHeight * 3;
						minY = -($(this).prev("ul").find(".date-show").length-4) * liHeight;

						if (isEnd) {
							isMove = false;
							isEnd = false;
							isStart = true;
							nY = -(nY-(mY-startY));
							nowY = endY;

							// 修正位置
							if (nY>maxY) {
								nowElement.css("transition", "all .3s");
								nowElement.css("transform", "translate(0, "+maxY+"px)");
							} else if (nY<minY) {
								nowElement.css("transition", "all .3s");
								nowElement.css("transform", "translate(0, "+minY+"px)");
							} else {
								// 缓动代码
								var endTime = new Date().getTime();
								//最后一段时间手指划动速度
								var v = (nowY-lastMoveStart)/(endTime-lastMoveTime);
								stopInertiaMove = false;
								(function(v, lastMoveTime, contentY) {
									// 加速度方向
									var dir = v > 0 ? -1 : 1;
									// 减速率 0.0006 为减速时间
									var deceleration = dir*0.0006;
									function inertiaMove() {
										if (stopInertiaMove) {
											return;
										}
										var nowTime = new Date().getTime();
										var t = nowTime - lastMoveTime;
										// 当前速度
										var nowV = v + t * deceleration;
										var moveY = (v + nowV) / 3 * t;
										// 减速停止过程
										if (dir*nowV>0) {
											// 移动总距离大于最大值时，修正回弹
											if (totalDistance>maxY) {
												nowElement.css("transition", "all .3s");
												nowElement.css("transform", "translate(0, "+maxY+"px)");
											} else if (totalDistance<minY) {
												// 同上，修正回弹
												nowElement.css("transition", "all .3s");
												nowElement.css("transform", "translate(0, "+minY+"px)");
											} else {
												nowElement.css("transition", "all .3s");
												nowElement.css("transform", "translate(0, "+Math.round(totalDistance/liHeight)*liHeight+"px)");
											}
											// 获取并填充日期
											setTimeout(function() {
												fillDate(nowElement.attr("id"));
											}, 300);
											return;
										}
										// 当前移动距离
										totalDistance = contentY + moveY;
										if (totalDistance>(maxY+(liHeight*3))) {
											nowElement.css("transition", "all .3s");
											nowElement.css("transform", "translate(0, "+maxY+"px)");
											return;
										} else if (totalDistance<(minY-(liHeight*3))) {
											nowElement.css("transition", "all .3s");
											nowElement.css("transform", "translate(0, "+minY+"px)");
											return;
										}
										nowElement.css("transform", "translate(0, "+totalDistance+"px)");
										// 获取并填充日期
										setTimeout(function() {
											fillDate(nowElement.attr("id"));
										}, 300);
										setTimeout(inertiaMove, 10);
									}
									inertiaMove();
								})(v, endTime, nY);
							}

							// 获取并填充日期
							setTimeout(function() {
								fillDate(nowElement.attr("id"));
							}, 300);
						}
					}, false);
				}

				/**
				 * 获取并填充日期
				 */
				function fillDate(id) {
					let currentY = 0;
					$("#date-box-"+dateId+" ul").each(function(index) {
						currentY = getTranslateY(this);
						let value = "";
						if (currentY==0) {
							value = $($(this).find("li")[3]).text();
						} else {
							value = $($(this).find("li")[Math.round(currentY/liHeight)+3]).text();
						}
						
						value = parseInt(value);
						if (index==0) {
							year = value;
						} else if (index==1) {
							month = value;
						} else if (index==2) {
							day = value;
						}
					});

					// 修改天数
					if (id!=undefined && id!=null) {
						if (id=="year-"+dateId || id=="month-"+dateId) {
							// 获取当前月应该有多少天
							let curMonthDays = new Date(year, month, 0).getDate();
							
							// 获取目前列表中的天数
							let curDays = $("#day-"+dateId+" .date-show").length;
							let dif = curMonthDays-curDays;
							
							if (dif>0) {
								// 显示被隐藏的天数
								for (let i=0; i<dif; i++) {
									$("#day-"+dateId+" li:eq("+[curDays+i]+")").removeClass("date-hide").addClass("date-show");
								}
							} else if (dif<0) {
								let moveY = getTranslateY($("#day-"+dateId));
								// 隐藏多余的天数
								for (let i=0; i>dif; i--) {
									$("#day-"+dateId+" li:eq("+[curDays-1+i]+")").removeClass("date-show").addClass("date-hide");
								}

								// 自动重新滚动天数
								if (moveY>(curMonthDays-4)*liHeight) {
									$("#day-"+dateId).css("transition", "all 0s");
									$("#day-"+dateId).css("transform", "translate(0, "+-(curMonthDays-4)*liHeight+"px)");

									// 重新对日期赋值
									day = curMonthDays;
								}
							}
						}
					}

					// 填充最终时间
					let monthStr = (parseInt(month) < 10 ? "0" : "") + parseInt(month);
					let dayStr = (parseInt(day) < 10 ? "0" : "") + parseInt(day);
					$("#javaex-picker-value-"+dateId).val(year + "-" + monthStr + "-" + dayStr);
				}

				function getTranslateY(element) {
					var matrix = $(element).css("transform");
					var translateY = 0;
					if (matrix!="none") {
						var arr = matrix.split(",");
						translateY = -(arr[5].split(")")[0]);
					}
					return translateY;
				}

				/**
				 * 关闭日期框
				 * isOk : 判断是否是点击确定按钮关闭的 
				 */
				function close(isOk) {
					if (isOk) {
						let monthStr = (parseInt(month) < 10 ? "0" : "") + parseInt(month);
						let dayStr = (parseInt(day) < 10 ? "0" : "") + parseInt(day);
						$("#javaex-picker-value-"+dateId).val(year + "-" + monthStr + "-" + dayStr);
						
						// 把时间显示到页面
						let obj = document.getElementById(dateId);
						if (obj && obj.tagName=="INPUT") {
							$("#"+dateId).val($("#javaex-picker-value-"+dateId).val());
						} else {
							$("#"+dateId).text($("#javaex-picker-value-"+dateId).val());
						}
					}
					// 隐藏日期框
					$(".javaex-mask").remove();
					$("#date-box-"+dateId).css("transform", "translateY(100%)");
					
					setTimeout(function() {
						$("#date-box-"+dateId).css("display", "none");
					}, 300);
				}
			},
			
			/**
			 * SwipeCell 滑动单元格
			 */
			swipe : function(args) {
				const target = {
					el : ""
				};
				const settings = Object.assign(target, defaults(args));
				
				// 绑定滚动事件
				var oScrollList = document.querySelectorAll(settings.el + " .javaex-swipe-content");
				for (let i=0; i<oScrollList.length; i++) {
					$(oScrollList[i]).parent().css("transform", "translate3d(0px, 0px, 0px)");
					
					let startX = 0;	// 当前触摸时的X坐标
					let moveX = 0;	// X轴的移动距离
					let rigthWidth = $(oScrollList[i]).parent().find(".javaex-swipe-right").width();	// 右侧操作按钮的宽度
					
					// 当手指触摸屏幕时候触发，即使已经有一个手指放在屏幕上也会触发
					oScrollList[i].addEventListener("touchstart", function (event) {
						event.preventDefault();

						// 记录当前触摸时的X坐标
						startX = event.touches[0].clientX;
					}, false);
					
					// 当手指在屏幕上滑动的时候连续地触发。在这个事件发生期间，调用preventDefault()事件可以阻止滚动
					oScrollList[i].addEventListener("touchmove", function (event) {
						event.preventDefault();

						moveX = event.touches[0].clientX;
						let moveLeftX = startX - moveX;	// 向左滑动距离
						let moveRightX = moveX - startX;	// 向右滑动距离
						let moveRigthWidth = 0;
						
						if (moveLeftX>0 && moveLeftX<=rigthWidth) {
							moveRigthWidth = moveLeftX * -1;
							let moveRigthWidthPx = (moveLeftX * -1) + "px";
							$(this).parent().css("transform", "translate3d("+moveRigthWidthPx+", 0px, 0px)");
						}
						
						if (moveRightX>0) {
							let matrix = $(this).parent().css("transform");
							let translateX = 0;
							if (matrix!="none") {
								let arr = matrix.split(",");
								translateX = parseInt((arr[0].split("(")[1]).replace(/px/, ""));
							}
							
							let moveRigthWidth = moveRightX + translateX;
							if (moveRigthWidth>0) {
								moveRigthWidth = 0;
							}
							let moveRigthWidthPx = moveRigthWidth + "px";
							$(this).parent().css("transform", "translate3d("+moveRigthWidthPx+", 0px, 0px)");
						}
					}, false);
					
					// 当手指从屏幕上离开的时候触发
					oScrollList[i].addEventListener("touchend", function (event) {
						event.preventDefault();
						
						let moveLeftX = startX - moveX;	// 向左滑动距离
						let moveRightX = moveX - startX;	// 向右滑动距离
						
						if (moveLeftX > (rigthWidth/2)) {
							let moveRigthWidthPx = (rigthWidth * -1) + "px";
							$(this).parent().css("transform", "translate3d("+moveRigthWidthPx+", 0px, 0px)");
						} else if (moveRightX > (rigthWidth/2)) {
							$(this).parent().css("transform", "translate3d(0px, 0px, 0px)");
						}
						
						startX = 0;
						moveX = 0;
					}, false);
				}
			},
			
			/**
			 * 滚动公告
			 */
			rollNotice : function(args) {
				const target = {
					id : "",
					delay : 3000
				};
				const settings = Object.assign(target, defaults(args));
				const $rollNotice = $("#" + settings.id);
				let liHeight = $rollNotice.find("ul li").eq(0).height();
				
				let fn = function() {
					$rollNotice.find("ul:first").animate({
						"margin-top": (liHeight * -1) + "px"
					}, 2000, function() {
						$(this).css("margin-top", 0).find("li:first").appendTo(this);
					});
				};

				// setInterval() 方法可按照指定的周期（以毫秒计）来调用函数或计算表达式。
				setInterval(fn, settings.delay);
			},
			
			/**
			 * 倒计时获取验证码
			 */
			timerId : null,
			code : function(args) {
				const target = {
					id : "",
					second : 45,
					text : "获取验证码",
					type : ""
				};
				const settings = Object.assign(target, defaults(args));
				
				let second = parseInt(settings.second);
				let $code = $("#"+settings.id);
				
				if (settings.type=="reset") {
					// 解禁
					clearInterval(info.timerId);
					
					$code.removeClass("javaex-code-disabled");
					$code.text(settings.text);
					second = parseInt(settings.second);
				} else {
					setTimer();
					
					function setTimer() {
						// 设置禁用
						$code.addClass("javaex-code-disabled");
						
						$code.text(second + "秒后重试");
						// 启动定时器
						info.timerId = setInterval(function() {
							second = second - 1;
							if (second>0) {
								$code.text(second + "秒后重试");
							} else {
								// 解禁
								clearInterval(info.timerId);
								$code.removeClass("javaex-code-disabled");
								$code.text(settings.text);
								second = parseInt(settings.second);
							}
						}, 1000);
					}
				}
			},
			
			/**
			 * Swiper 轮播
			 */
			swiper : function(args) {
				const target = {
					id : "",
					isAutoPlay : true,
					focusCenter : false,
					startSlide : 1,
					delay : 3000,
					isInit : false,
					dataOriginal : "data-original",
					callback : function() {return true;}
				};
				const settings = Object.assign(target, defaults(args));
				let id = settings.id;
				// 是否自动轮播
				var isAutoPlay = settings.isAutoPlay;
				// 开始切换的位置（即从第几张图开始切换），从1开始计
				var startSlide = parseInt(settings.startSlide);
				var index = startSlide-1;
				
				var diffLeftX = 0;
				
				var slide = document.getElementById(id);
				var focusBg = document.querySelector("#"+id+" .javaex-swiper-focus-bg");
				var imgLi = document.querySelectorAll("#"+id+" .javaex-swiper-focus-bg li");
				var imgLiWidth = focusBg.offsetWidth;
				
				// 设置幻灯片容器的高度
				slide.style.height = imgLi[0].offsetHeight + "px";
				// 设置大图容器的宽度百分比
				focusBg.style.width = imgLi.length*100 + "%";
				// 设置每一张图片所占的百分比
				for (var i=0; i<imgLi.length; i++) {
					imgLi[i].style.width = 1/imgLi.length * 100 + "%";
				};
				
				// 自动轮播间隔多少毫秒
				var delay = parseInt(settings.delay);
				if (delay==200) {
					delay = 2000;
				}
				// 定时器
				var time = null;
				
				var $slide =  $("#"+id);
				var $self = $slide.find(".javaex-swiper-focus-bg li").eq(index).find("img");
				if ($self.length==0) {
					$self = slide.find(".javaex-swiper-focus-bg li").eq(index).find("a");
				}
				var original = $self.attr(settings.dataOriginal);
				if (!!original) {
					if ($self.is("img")) {
						$self.attr("src", original);
					} else {
						$self.css("background-image", "url('" + original + "')");
					}
					$self.removeAttr(settings.dataOriginal);
				}

				if (settings.isInit) {
					settings.callback({
						"index": index + 1
					});
				}
				
				var slideBg = $slide.find(".javaex-swiper-focus-bg");
				var slideLi = slideBg.find("li");
				var count = slideLi.length;

				// 默认从第几张开始切换
				$slide.find(".javaex-swiper-focus-bg li").each(function(i) {
					if (i==index) {
						diffLeftX = -index*slide.offsetWidth;

						var leftX = -index*slide.offsetWidth + "px";
						$("#"+id+" .javaex-swiper-focus-bg").css("transition", "all .5s");
						$("#"+id+" .javaex-swiper-focus-bg").css("transform", "translate("+leftX+", 0)");
					}
				});
				// 默认显示的标题
				if ($slide.find(".focus-title").length>0) {
					$slide.find(".focus-title li").each(function(i) {
						if (i==index) {
							$(this).show();
						} else {
							$(this).hide();
						}
					});
				}

				// 焦点是否自动居中
				if (settings.focusCenter) {
					var box = $slide.find(".javaex-swiper-focus-box");
					box.css("margin-left", -(box.width()/2)+"px");
				}

				// 默认高亮的焦点
				if ($slide.find(".javaex-swiper-focus-box").length>0) {
					// 如果缺省焦点，则自动补充
					if ($slide.find(".javaex-swiper-focus-box ul").length==0) {
						var html = '<ul>';
						for (var i=0; i<count; i++) {
							html += '<li></li>';
						}
						html += '</ul>';
						$slide.find(".javaex-swiper-focus-box").empty();
						$slide.find(".javaex-swiper-focus-box").append(html);
					}
					$slide.find(".javaex-swiper-focus-box li").eq(index).addClass("on");
				}
				
				// 自动轮播
				autoPlay();

				/**
				 * 自动轮播
				 */
				function autoPlay() {
					if (isAutoPlay) {
						time = setInterval(function() {
							var old = index;
							if (index >= (count-1)) {
								index = 0;
							} else {
								index++;
							}
							change.call(slide, index, old);
						},
						delay);
					}
				}
				
				function change(show, hide) {
					diffLeftX = -show*slide.offsetWidth;
					// 背景大图
					var leftX = -show*slide.offsetWidth + "px";
					$("#"+id+" .javaex-swiper-focus-bg").css("transition", "all .5s");
					$("#"+id+" .javaex-swiper-focus-bg").css("transform", "translate("+leftX+", 0)");
					// 标题
					$slide.find(".focus-title li").eq(hide).hide();
					$slide.find(".focus-title li").eq(show).show();
					// 焦点
					$slide.find(".javaex-swiper-focus-box li").removeClass("on");
					$slide.find(".javaex-swiper-focus-box li").eq(show).addClass("on");

					// 触发图片懒加载
					var $self = $slide.find(".javaex-swiper-focus-bg li").eq(show).find("img");
					if ($self.length==0) {
						$self = $slide.find(".javaex-swiper-focus-bg li").eq(show).find("a");
					}
					var original = $self.attr(settings.dataOriginal);
					if (!!original) {
						if ($self.is("img")) {
							$self.attr("src", original);
						} else {
							$self.css("background-image", "url('" + original + "')");
						}
						$self.removeAttr(settings.dataOriginal);
					}

					// 回调函数
					settings.callback({
						"index": show + 1
					});
				}
				
				// 初始化手指坐标点
				var startPointX = 0;
				var startEle = 0;
				//手指按下
				slide.addEventListener("touchstart", function(e) {
					if (isAutoPlay) {
						clearInterval(time);
					}
					startPointX = e.changedTouches[0].pageX;
					startEle = diffLeftX;
				});
				//手指滑动
				slide.addEventListener("touchmove", function(e) {
					if (isAutoPlay) {
						clearInterval(time);
					}
					e.preventDefault();
					var curPointX = e.changedTouches[0].pageX;
					var diffX = curPointX - startPointX;
					var left = startEle + diffX;
					diffLeftX = left;
					
					var leftX = left + "px";
					$("#"+id+" .javaex-swiper-focus-bg").css("transition", "all .5s");
					$("#"+id+" .javaex-swiper-focus-bg").css("transform", "translate("+leftX+", 0)");
				});
				//当手指抬起的时候，判断图片滚动离左右的距离
				slide.addEventListener("touchend", function(e) {
					if (isAutoPlay) {
						autoPlay();
					}
					
					var left = diffLeftX;
					// 判断正在滚动的图片距离左右图片的远近，以及是否为最后一张或者第一张
					var curNum = Math.round(-left/imgLiWidth);
					curNum = curNum>=(imgLi.length-1) ? imgLi.length-1 : curNum;
					curNum = curNum<=0 ? 0 : curNum;
					
					var old = index;
					
					if (index==curNum) {
						change.call(slide, index, index);
					} else {
						if (index<curNum) {
							if (index >= (count-1)) {
								index = 0;
							} else {
								index++;
							}
						} else {
							if (index <= 0) {
								index = count - 1;
							} else {
								index--;
							}
						}
						
						change.call(slide, index, old);
					}
				});
			},
			
			/**
			 * Flow 流加载分页
			 */
			loadDataFunction : "",	// 请求数据的函数
			isDataLoaded : false,	// 是否已滚动加载
			isOver : "",			// 哪一块内容区域已经没有更多数据了
			documentHeight : "",	// 文档高度
			loadDistance : 0,	// 滑到哪里开始触发加载
			windowHeight : "",	// 屏幕高度
			loadingStyle : "",
			noData : "",
			setPageInit : function() {
				info.loadDataFunction = "";
				info.isDataLoaded = false;
				info.isOver = "";
				info.documentHeight = "";
				info.loadDistance = 0;
				info.windowHeight = "";
				info.loadingStyle = "";
				info.noData = "";
			},
			// 上拉加载，相当于分页
			flow : function(args) {
				const target = {
					id : "",
					loadDataFunction : "",
					loadingStyle : "<div class='javaex-loading'><span class='javaex-loading-spinner javaex-loading-spinner-circular javaex-infinite-loading-style'><svg class='javaex-loading-circular'viewBox='25 25 50 50'><circle cx='50'cy='50'r='20'fill='none'></circle></svg></span><span class='javaex-loading-desc'>加载中...</span></div>",
					noData : "<div class='javaex-infinite-no-data'> 没有更多内容了，亲～ </div>"
				};
				const settings = Object.assign(target, defaults(args));
				var pageId = settings.id;
				
				info.loadDataFunction = settings.loadDataFunction;
				info.documentHeight = $(document).height();
				info.windowHeight = document.documentElement.clientHeight;
				info.loadingStyle = settings.loadingStyle;
				info.noData = settings.noData;
				
				init();

				function init() {
					// 事先在下方插入加载占位div
					var obj = document.getElementById("infinite-scroll-preloader-"+pageId);
					if (obj==null) {
						$("#"+pageId).after('<div id="infinite-scroll-preloader-'+pageId+'" class="javaex-infinite-scroll-preloader"></div>');
					}

					// 滑到站位加载区2/3处时加载数据
					info.loadDistance = Math.floor($("#infinite-scroll-preloader-"+pageId).height()*(1/3));
					if (info.loadDistance==0) {
						info.loadDistance = 90;
					}
					// 加载下方数据
					$(window).on('scroll',function() {
						// 滚动页面触发加载数据
						if (!info.isDataLoaded
							&& info.isOver!=pageId
							&& (info.documentHeight-info.loadDistance) <= (info.windowHeight+$(window).scrollTop())) {
							info.loadDown(pageId);
						}
					});

					// 自动向下方加载数据，直至充满整个屏幕
					info.autoLoad(pageId);
				}
			},
			// 设置上滑加载已无数据
			over : function(pageId) {
				info.isOver = pageId;
			},
			// 如果文档高度不大于窗口高度，数据较少，自动向下方加载数据
			autoLoad : function(pageId) {
				if ((info.documentHeight-info.loadDistance) <= info.windowHeight) {
					info.loadDown(pageId);
				}
			},
			// 向下方加载数据
			loadDown : function(pageId) {
				$("#infinite-scroll-preloader-"+pageId).html(info.loadingStyle);
				info.isDataLoaded = true;
				info.loadDataFunction();
			},
			// 重置上滑加载的一些属性
			resetLoad : function(pageId) {
				// 重新设置文档的高度
				info.documentHeight = $(document).height();
				
				info.isDataLoaded = false;
				if (info.isOver==pageId) {
					$("#infinite-scroll-preloader-"+pageId).html(info.noData);
				} else {
					info.autoLoad();
				}
			},
			
			/**
			 * PullRefresh 下拉刷新
			 */
			pullRefresh : function(args) {
				const target = {
					id : "",
					tip : "释放刷新",
					callback : function() {return true;}
				};
				const settings = Object.assign(target, defaults(args));
				const $pullRefresh = $("#"+settings.id);
				
				let startY = 0;	// 当前触摸时的Y坐标
				let moveY = 0;	// Y轴的移动距离
				let moveDownY = 0;// 向下拉动距离
				// 绑定滚动事件
				let oScroll = document.getElementById(settings.id);
				// 当手指触摸屏幕时候触发，即使已经有一个手指放在屏幕上也会触发
				oScroll.addEventListener("touchstart", function (event) {
					event.preventDefault();

					// 记录当前触摸时的Y坐标
					startY = event.touches[0].clientY;
				}, false);

				// 当手指在屏幕上滑动的时候连续地触发。在这个事件发生期间，调用preventDefault()事件可以阻止滚动
				oScroll.addEventListener("touchmove", function (event) {
					event.preventDefault();

					moveY = event.touches[0].clientY;
					moveDownY = moveY - startY;	// 向下拉动距离
					
					let moveDownYPx = moveDownY + "px";
					if (moveDownY>0 && moveDownY<=100) {
						if (moveDownY>50) {
							if ($("#javaex-pullRefresh-loading-xx-"+settings.id).length==0) {
								$pullRefresh.prepend('<div id="javaex-pullRefresh-loading-xx-'+settings.id+'" class="javaex-pullRefresh-tip">'+settings.tip+'</div>');
							}
						}
						
						$pullRefresh.css("transform", "translate3d(0px, "+moveDownYPx+", 0px)");
					}
				}, false);

				// 当手指从屏幕上离开的时候触发
				oScroll.addEventListener("touchend", function (event) {
					event.preventDefault();
					
					if (moveDownY>100) {
						$("#javaex-pullRefresh-loading-xx-"+settings.id).remove();
						
						$pullRefresh.css("transition", "all .3s");
						$pullRefresh.css("transform", "translate3d(0px, 0px, 0px)");
						settings.callback({});
					}
					
					startY = 0;
					moveY = 0;
					moveDownY = 0;
				}, false);
			},
			
			/**
			 * Steps 步骤条
			 */
			steps : function(args) {
				const target = {
					id : "",
					stepProcess : 1
				};
				const settings = Object.assign(target, defaults(args));
				const $steps = $("#"+settings.id);
				
				$steps.find("li").removeClass("javaex-step-finish").removeClass("javaex-step-process").removeClass("javaex-step-wait");
				
				$.each($steps.find("li"), function(index, value) {
					if ((index+1) < parseInt(settings.stepProcess)) {
						$(this).addClass("javaex-step-finish");
					}
					else if ((index+1) == parseInt(settings.stepProcess)) {
						$(this).addClass("javaex-step-process");
					}
					else {
						$(this).addClass("javaex-step-wait");
					}
				});
			},
			
			/**
			 * Collapse 折叠面板
			 */
			collapse : function(args) {
				const target = {
					id : "",
					alone : false,
					isShowAll : false,
					open : function() {return true;},
					close : function() {return true;}
				};
				const settings = Object.assign(target, defaults(args));
				
				// 判断是否初始化全部展开
				if (settings.isShowAll) {
					$.each($("#"+settings.id + " .javaex-cell"), function(index, value) {
						$(this).find("i.javaex-icon").removeClass("icon-angle-down").addClass("icon-angle-up");
						$(this).next().slideDown(300);
					});
				}
				
				$("#"+settings.id + " .javaex-cell").bind("click", function() {
					let index = $("#"+settings.id + " .javaex-cell").index(this) + 1;
					
					if ($(this).next().css("display")=="none") {
						// 判断是否只允许展开一个
						if (settings.alone) {
							$.each($("#"+settings.id + " .javaex-cell"), function(index, value) {
								$(this).find("i.javaex-icon").removeClass("icon-angle-up").addClass("icon-angle-down");
								$(this).next().slideUp(300);
							});
						}
						
						$(this).find("i.javaex-icon").removeClass("icon-angle-down").addClass("icon-angle-up");
						$(this).next().slideDown(300);
						
						settings.open({
							"index" : index
						});
					} else {
						$(this).find("i.javaex-icon").removeClass("icon-angle-up").addClass("icon-angle-down");
						$(this).next().slideUp(300);

						settings.close({
							"index" : index
						});
					}
				});
			},
			
			/**
			 * UploadImage 单图上传
			 */
			uploadImage : function(args) {
				const target = {
					id : "",
					url : "",
					param : {"file":"file"},
					header : {},
					maxSize : "",
					imageSrc : "",
					dataType : "base64",
					placeholder : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC",
					sendCookie : false,
					crossDomain : true,
					chooseBefore : function() {return true;},
					chooseAfter : function() {return true;},
					deleteImage : function() {return true;},
					callback : function() {return true;}
				};
				const settings = Object.assign(target, defaults(args));
				
				var url = settings.url;                      // 请求路径
				var inputId = settings.id;                   // <input type="file" />的id
				var maxSize = settings.maxSize;              // 单张图片的大小上限，单位KB，0或空为不限制
				var param = settings.param;
				var header = settings.header;
				var dataType = settings.dataType;            // 图片上传后的返回类型
				
				let uploadingStr = '<div id="javaex-uploadImage-loading-'+inputId+'" class="javaex-uploader-preview">\
							<div class="javaex-image javaex-uploader-preview-image">\
								<img src="'+settings.placeholder+'" class="javaex-image-img" style="object-fit: cover;">\
							</div>\
							<div class="javaex-uploader-mask">\
								<div class="javaex-loading javaex-uploader-loading">\
									<span class="javaex-loading-spinner javaex-loading-spinner-circular">\
										<svg class="javaex-loading-circular" viewBox="25 25 50 50">\
											<circle cx="50" cy="50" r="20" fill="none"></circle>\
										</svg>\
									</span>\
								</div>\
								<div class="javaex-uploader-mask-message">上传中...</div>\
							</div>\
							<div class="javaex-uploader-preview-delete javaex-uploader-preview-delete-shadow">\
								<i class="javaex-badge-wrapper javaex-icon javaex-icon-cross icon-close"></i>\
							</div>\
						</div>';
				let uploaderrorStr = '<i class="javaex-badge-wrapper javaex-icon icon-close"></i><div class="javaex-uploader-mask-message">上传失败</div>';
				
				let $upload = $("#"+inputId).parent(".javaex-uploader-upload");
				
				// 图片回显
				if (settings.imageSrc != "") {
					$upload.hide();
					$upload.before(uploadingStr);
					let $uploading = $("#javaex-uploadImage-loading-"+inputId);

					imgBindEvent($uploading);

					$uploading.find(".javaex-uploader-mask").remove();
					$uploading.find(".javaex-uploader-preview-image img").prop("src", settings.imageSrc);
				}
				
				// 点击上传
				$("#"+inputId).change(function() {
					// 选择文件前的回调函数
					settings.chooseBefore();

					// 得到上传图片按钮的图像文件
					var file = $("#"+inputId)[0].files[0];

					if (!checkImg(file)) {
						return false;
					}

					// 选择文件后的回调函数
					var filename = file.name;
					var fileSuffix = "";
					var pos = filename.lastIndexOf(".");
					if (pos>-1) {
						fileSuffix = filename.substring(pos + 1);
					}
					settings.chooseAfter({
						"filename" : filename,
						"filesize" : file.size,
						"fileSuffix" : fileSuffix
					});
					
					if (dataType=="base64") {
						// 创建FileReader对象
						let reader = new FileReader();

						// onload表示文件读取完成并成功时，触发回调函数
						reader.onload = function (event) {
							// 得到图片的base64编码
							let base64Img = event.target.result;

							$upload.hide();
							$upload.before(uploadingStr);
							let $uploading = $("#javaex-uploadImage-loading-"+inputId);
							
							imgBindEvent($uploading);
							
							$uploading.find(".javaex-uploader-mask").remove();
							$uploading.find(".javaex-uploader-preview-image img").prop("src", base64Img);
							
							// 回调函数，返回图片的base64
							settings.callback(base64Img);
						};
						// 使用FileReader对象的readAsDataURL方法来读取图像文件
						reader.readAsDataURL(file);
					} else if (dataType=="url") {
						// 创建FormData对象
						let data = new FormData();
						// 为FormData对象添加数据
						for (let key in param) {
							if (key=="file") {
								data.append(param[key], file);
							} else {
								data.append(key, param[key]);
							}
						}

						$upload.hide();
						$upload.before(uploadingStr);
						let $uploading = $("#javaex-uploadImage-loading-"+inputId);
						imgBindEvent($uploading);
						
						// 发送数据
						$.ajax({
							url : url,
							type : "post",
							data : data,
							dataType : "json",
							cache : false,
							contentType : false,
							processData : false,
							xhrFields: {
								withCredentials: settings.sendCookie
							},
							crossDomain: settings.crossDomain,
							beforeSend : function(request) {
								for (let key in header) {
									request.setRequestHeader(key, header[key]);
								}
							},
							success : function(rtn) {
								$uploading.find(".javaex-uploader-mask").remove();
								$uploading.find(".javaex-uploader-preview-image img").prop("src", settings.placeholder);
								$uploading.removeAttr("id");
								
								settings.callback(rtn);
							},
							error : function() {
								$uploading.find(".javaex-uploader-mask").html(uploaderrorStr);
							}
						});
					}
					
					$("#"+inputId).val("");
				});

				/**
				 * 为删除图片绑定事件
				 */
				function imgBindEvent($uploading) {
					// 绑定删除图片事件
					$uploading.find(".javaex-uploader-preview-delete").on("click", function() {
						$(this).parent(".javaex-uploader-preview").remove();

						$("#"+inputId).parent(".javaex-uploader-upload").show();

						settings.deleteImage();
					});
				}
				
				/**
				 * 校验图片
				 */
				function checkImg(file) {
					if (file==null) {
						return false;
					}
					// 校验图片类型
					if (!/\.(gif|jpg|jpeg|png|webp|bmp|GIF|JPG|JPEG|PNG|WEBP|BMP)$/.test(file.name)) {
						info.toast({
							content : "图片类型必须是.gif,jpeg,jpg,png,webp,bmp中的一种",
							type : "message"
						});
						return false;
					}
					
					// 校验图片大小
					if (maxSize=="" || maxSize==0 || maxSize=="0") {
						// 不校验
					} else {
						if (file.size > (maxSize*1024)) {
							info.toast({
								content : "图片过大，单张图片上限 "+maxSize+"KB",
								type : "message"
							});
							return false;
						}
					}
					
					return true;
				}
			},
			
			/**
			 * UploadImages 多图上传
			 */
			uploadImages : function(args) {
				const target = {
					id : "",
					param : {"file":"file"},
					header : {},
					maxSize : "",
					image : {},
					imgList : null,
					maxNum : 10,
					dataType : "base64",
					placeholder : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC",
					sendCookie : false,
					crossDomain : true,
					chooseBefore : function() {return true;},
					chooseAfter : function() {return true;},
					deleteImage : function() {return true;},
					callback : function() {return true;}
				};
				const settings = Object.assign(target, defaults(args));
				
				var imageObj = settings.image;
				var inputId = settings.id;                   // <input type="file" />的id
				var maxSize = settings.maxSize;              // 单张图片的大小上限，单位KB，0或空为不限制
				var param = settings.param;
				var header = settings.header;
				var dataType = settings.dataType;            // 图片上传后的返回类型
				var imgList = settings.imgList;
				
				let uploadingStr = '<div id="javaex-uploadImage-loading-'+inputId+'" class="javaex-uploader-preview">\
							<div class="javaex-image javaex-uploader-preview-image">\
								<img src="'+settings.placeholder+'" class="javaex-image-img" style="object-fit: cover;">\
							</div>\
							<div class="javaex-uploader-mask">\
								<div class="javaex-loading javaex-uploader-loading">\
									<span class="javaex-loading-spinner javaex-loading-spinner-circular">\
										<svg class="javaex-loading-circular" viewBox="25 25 50 50">\
											<circle cx="50" cy="50" r="20" fill="none"></circle>\
										</svg>\
									</span>\
								</div>\
								<div class="javaex-uploader-mask-message">上传中...</div>\
							</div>\
							<div class="javaex-uploader-preview-delete javaex-uploader-preview-delete-shadow">\
								<i class="javaex-badge-wrapper javaex-icon javaex-icon-cross icon-close"></i>\
							</div>\
						</div>';
				let uploaderrorStr = '<i class="javaex-badge-wrapper javaex-icon icon-close"></i><div class="javaex-uploader-mask-message">上传失败</div>';
				
				let $upload = $("#"+inputId).parent(".javaex-uploader-upload");
				
				// 图片回显
				if (imgList != null && imgList.length>0) {
					for (let i=0; i<imgList.length; i++) {
						$upload.before(uploadingStr);
						let $uploading = $("#javaex-uploadImage-loading-"+inputId);

						imgBindEvent($uploading);

						$uploading.find(".javaex-uploader-mask").remove();
						$uploading.find(".javaex-uploader-preview-image img").prop("src", imgList[i]);
						$uploading.removeAttr("id");
					}
					
					// 当前已经存在的图片数量
					let nowNum = $("#"+inputId).closest(".javaex-uploader-wrapper").find("img").length;
					if (nowNum >= parseInt(settings.maxNum)) {
						$upload.hide();
					}
					
					let imgUrlArr = new Array();
					$("#"+inputId).closest(".javaex-uploader-wrapper").find("img").each(function() {
						imgUrlArr.push($(this).attr("src"));
					});

					settings.callback(imgUrlArr);
				}
				
				// 点击上传
				$("#"+inputId).change(function() {
					// 选择文件前的回调函数
					settings.chooseBefore();

					// 得到上传图片按钮的图像文件
					var file = $("#"+inputId)[0].files[0];

					if (!checkImg(file)) {
						return false;
					}

					// 选择文件后的回调函数
					var filename = file.name;
					var fileSuffix = "";
					var pos = filename.lastIndexOf(".");
					if (pos>-1) {
						fileSuffix = filename.substring(pos + 1);
					}
					settings.chooseAfter({
						"filename" : filename,
						"filesize" : file.size,
						"fileSuffix" : fileSuffix
					});
					
					$("#"+inputId).prop("disabled", true);
					
					if (dataType=="base64") {
						// 创建FileReader对象
						let reader = new FileReader();

						// onload表示文件读取完成并成功时，触发回调函数
						reader.onload = function (event) {
							// 得到图片的base64编码
							let base64Img = event.target.result;

							$upload.before(uploadingStr);
							let $uploading = $("#javaex-uploadImage-loading-"+inputId);
							
							imgBindEvent($uploading);
							
							$uploading.find(".javaex-uploader-mask").remove();
							$uploading.find(".javaex-uploader-preview-image img").prop("src", base64Img);
							
							// 当前已经存在的图片数量
							let nowNum = $uploading.parent().find("img").length;
							if (nowNum>=parseInt(settings.maxNum)) {
								$upload.hide();
							}

							let imgUrlArr = new Array();
							$("#"+inputId).closest(".javaex-uploader-wrapper").find("img").each(function() {
								imgUrlArr.push($(this).attr("src"));
							});

							$uploading.removeAttr("id");

							$("#"+inputId).prop("disabled", false);
							
							settings.callback(imgUrlArr);
						};
						// 使用FileReader对象的readAsDataURL方法来读取图像文件
						reader.readAsDataURL(file);
					} else if (dataType=="url") {
						// 创建FormData对象
						let data = new FormData();
						// 为FormData对象添加数据
						for (let key in param) {
							if (key=="file") {
								data.append(param[key], file);
							} else {
								data.append(key, param[key]);
							}
						}

						$upload.before(uploadingStr);
						let $uploading = $("#javaex-uploadImage-loading-"+inputId);
						imgBindEvent($uploading);
						
						// 当前已经存在的图片数量
						let nowNum = $uploading.parent().find("img").length;
						if (nowNum>=parseInt(settings.maxNum)) {
							$upload.hide();
						}
						
						// 发送数据
						$.ajax({
							url : imageObj.url,
							type : "post",
							data : data,
							dataType : "json",
							cache : false,
							contentType : false,
							processData : false,
							xhrFields: {
								withCredentials: settings.sendCookie
							},
							crossDomain: settings.crossDomain,
							beforeSend : function(request) {
								for (let key in header) {
									request.setRequestHeader(key, header[key]);
								}
							},
							success : function(rtn) {
								let imgSrc = "";
								if (!imageObj.prefix) {
									if (imageObj.imgUrl.split(".").length==3) {
										imgSrc = rtn[imageObj.imgUrl.split(".")[0]][imageObj.imgUrl.split(".")[1]][imageObj.imgUrl.split(".")[2]];
									} else if (imageObj.imgUrl.split(".").length==2) {
										imgSrc = rtn[imageObj.imgUrl.split(".")[0]][imageObj.imgUrl.split(".")[1]];
									} else {
										imgSrc = rtn[imageObj.imgUrl];
									}
								} else {
									if (imageObj.imgUrl.split(".").length==3) {
										imgSrc = imageObj.prefix + rtn[imageObj.imgUrl.split(".")[0]][imageObj.imgUrl.split(".")[1]][imageObj.imgUrl.split(".")[2]];
									} else if (imageObj.imgUrl.split(".").length==2) {
										imgSrc = imageObj.prefix + rtn[imageObj.imgUrl.split(".")[0]][imageObj.imgUrl.split(".")[1]];
									} else {
										imgSrc = imageObj.prefix + rtn[imageObj.imgUrl];
									}
								}
								
								$uploading.find(".javaex-uploader-mask").remove();
								$uploading.find(".javaex-uploader-preview-image img").prop("src", imgSrc);

								let imgUrlArr = new Array();
								$("#"+inputId).closest(".javaex-uploader-wrapper").find("img").each(function() {
									imgUrlArr.push($(this).attr("src"));
								});
								
								$uploading.removeAttr("id");
								
								$("#"+inputId).prop("disabled", false);
								
								settings.callback(imgUrlArr);
							},
							error : function() {
								$("#"+inputId).prop("disabled", false);
								$uploading.find(".javaex-uploader-mask").html(uploaderrorStr);
							}
						});
					}
					
					$("#"+inputId).val("");
				});

				/**
				 * 为删除图片绑定事件
				 */
				function imgBindEvent($uploading) {
					// 绑定删除图片事件
					$uploading.find(".javaex-uploader-preview-delete").on("click", function() {
						$(this).parent(".javaex-uploader-preview").remove();

						$("#"+inputId).parent(".javaex-uploader-upload").show();

						settings.deleteImage();
						
						let imgUrlArr = new Array();
						$("#"+inputId).closest(".javaex-uploader-wrapper").find("img").each(function() {
							imgUrlArr.push($(this).attr("src"));
						});

						settings.callback(imgUrlArr);
					});
				}

				/**
				 * 校验图片
				 */
				function checkImg(file) {
					if (file==null) {
						return false;
					}
					// 校验图片类型
					if (!/\.(gif|jpg|jpeg|png|webp|bmp|GIF|JPG|JPEG|PNG|WEBP|BMP)$/.test(file.name)) {
						info.toast({
							content : "图片类型必须是.gif,jpeg,jpg,png,webp,bmp中的一种",
							type : "message"
						});
						return false;
					}
					
					// 校验图片大小
					if (maxSize=="" || maxSize==0 || maxSize=="0") {
						// 不校验
					} else {
						if (file.size > (maxSize*1024)) {
							info.toast({
								content : "图片过大，单张图片上限 "+maxSize+"KB",
								type : "message"
							});
							return false;
						}
					}
					
					return true;
				}
			},
			
			/**
			 * UploadFile 文件上传
			 */
			uploadFile : function(args) {
				const target = {
					id : "",
					url : "",
					param : {"file":"file"},
					header : {},
					maxSize : "",
					isShowTip : false,
					sendCookie : false,
					crossDomain : true,
					chooseBefore : function() {return true;},
					chooseAfter : function() {return true;},
					callback : function() {return true;}
				};
				const settings = Object.assign(target, defaults(args));
				
				var url = settings.url;                      // 请求路径
				var inputId = settings.id;                   // <input type="file" />的id
				var maxSize = settings.maxSize;              // 单张图片的大小上限，单位KB，0或空为不限制
				var param = settings.param;
				var header = settings.header;
				
				// 点击上传
				$("#"+inputId).change(function() {
					// 选择文件前的回调函数
					settings.chooseBefore();

					// 得到上传按钮的文件
					let file = $("#"+inputId)[0].files[0];

					// 校验文件大小
					if (maxSize=="" || maxSize==0 || maxSize=="0") {
						// 不校验
					} else {
						if (file.size>(maxSize*1024*1024)) {
							info.toast({
								content : "文件过大，单个文件上限 "+maxSize+"KB",
								type : "message"
							});
							return false;
						}
					}

					// 创建FormData对象
					var data = new FormData();
					// 为FormData对象添加数据
					for (let key in param) {
						if (key=="file") {
							data.append(param[key], file);
						} else {
							data.append(key, param[key]);
						}
					}

					// 选择文件后的回调函数
					var filename = file.name;
					var fileSuffix = "";
					var pos = filename.lastIndexOf(".");
					if (pos>-1) {
						fileSuffix = filename.substring(pos + 1);
					}
					settings.chooseAfter({
						"filename" : filename,
						"filesize" : file.size,
						"fileSuffix" : fileSuffix
					});

					if (settings.isShowTip) {
						info.toast({
							content : "上传中...",
							type : "loading"
						});
					}

					// 发送数据
					$.ajax({
						url : url,
						type : "post",
						data : data,
						dataType : "json",
						cache : false,
						contentType : false,
						processData : false,
						xhrFields: {
							withCredentials: settings.sendCookie
						},
						crossDomain: settings.crossDomain,
						beforeSend : function(request) {
							for (let key in header) {
								request.setRequestHeader(key, header[key]);
							}
						},
						success : function(rtn) {
							if (settings.isShowTip) {
								info.toast({
									content : "上传成功",
									type : "success"
								});
							}
							
							settings.callback(rtn);
						},
						error : function() {
							info.toast({
								content : "上传失败",
								type : "error"
							});
						}
					});

					$("#"+inputId).unbind("change");
					$("#"+inputId).val("");
				});
			}
		};

		return info;
	};
	
	window.javaex = javaex();
})();

$(function() {
	javaex.radio();
	javaex.checkbox();
	javaex.listenCheckbox();
});
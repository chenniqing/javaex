/**
 * 作者：陈霓清
 * 官网：http://www.javaex.cn
 */
; (function() {
	var javaex = function() {
		function defaults(args) {
			var defaults = {
				id: "",
				type: "",
				url: "",
				data: [],
				checkbox: true,
				isShowAllSelect: false,
				isAllowJumpUrl: false,
				icon: false,
				withoutNodeArr: null,
				percent: "0.01%",
				isShowPercent: false,
				tags: "",
				mask: true,
				width: 300,
				height: "",
				top: "30%",
				title: "温馨提示",
				closeIcon: true,
				content: "",
				textAlign: "left",
				tip: "删除后不可恢复，请慎重操作",
				confirmName: "确定",
				cancelName: "取消",
				callback: function() {
					return true
				},
				live: 2000,
				selector: "",
				scrolling: "yes",
				isBackground: false,
				isAutoSelected: false,
				num: 10,
				size: 24,
				scoreArr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
				levelTextArr: ['1分', '2分', '3分', '4分', '5分', '6分', '7分', '8分', '9分', '10分'],
				score: "",
				isReadOnly: false,
				current: 1,
				mode: "mouseover",
				delay: 200,
				display: "block",
				mergeColArr: [],
				tree: 0,
				maxNum: 6,
				isSearch: false,
				pageCount: null,
				currentPage: 1,
				position: "right",
				date: "",
				startDate: "",
				endDate: "",
				alignment: "left",
				monthNum: 1,
				splitLine: " - ",
				isTime: false,
				maxDay: "",
				time: "",
				imgDivId: "image-box",
				cutBox: "cut-box",
				moveBox: "move-box",
				dataUrl: "data-url",
				containerId: "",
				param: "file",
				maxSize: "",
				imgUrl: "",
				dataType: "base64",
				commentCount: 0,
				list: null,
				commentMapping: null,
				replyMapping: null,
				userId: "",
				avatar: "",
				image: null
			};
			return $.extend(defaults, args)
		}
		var info = {
			generateID: function() {
				return Date.now().toString(36) + Math.random().toString(36).substr(3, 3)
			},
			tree: function(args) {
				var opt = defaults(args);
				var id = opt.id;
				var jsonData = opt.data;
				var checkbox = opt.checkbox;
				var icon = opt.icon;
				var withoutNodeArr = opt.withoutNodeArr;
				var flag = false;
				function tree(jsonData, nodeIndex) {
					if (jsonData.length > 0) {
						if (!nodeIndex) {
							nodeIndex = 1
						}
						html += '<ul style="overflow: hidden;">';
						$.each(jsonData,
						function(i, data) {
							if ( !! data.childrenList && data.childrenList.length > 0) {
								if (data.open) {
									html += '<li class="tree-parent-li" open="true">'
								} else {
									html += '<li class="tree-parent-li">'
								}
								html += '<span class="tree-icon icon-caret-right"></span>';
								if (checkbox) {
									if (data.checked) {
										html += '<input type="checkbox" class="fill listen-' + id + '1-2" node="' + nodeIndex + '" name="javaex-tree" value="' + data.id + '" checked/> '
									} else {
										html += '<input type="checkbox" class="fill listen-' + id + '1-2" node="' + nodeIndex + '" name="javaex-tree" value="' + data.id + '" /> '
									}
								}
								html += '<a href="javascript:;" node="' + nodeIndex + '" menu-id="' + data.id + '">';
								if (icon) {
									if ( !! data.icon) {
										flag = true;
										html += '<span class="tree-icon ' + data.icon + '"></span>'
									} else {
										html += '<span class="tree-icon icon-folder"></span>'
									}
								}
								html += data.name + '</a>';
								tree(data.childrenList, (nodeIndex + 1))
							} else {
								html += '<li class="tree-child-li">';
								if (checkbox) {
									if (data.checked) {
										html += '<input type="checkbox" class="fill listen-' + id + '1-2" node="' + nodeIndex + '" name="javaex-tree" value="' + data.id + '" checked/> '
									} else {
										html += '<input type="checkbox" class="fill listen-' + id + '1-2" node="' + nodeIndex + '" name="javaex-tree" value="' + data.id + '" /> '
									}
								}
								if (!data.url || opt.isAllowJumpUrl == false) {
									html += '<a href="javascript:;" node="' + nodeIndex + '" menu-id="' + data.id + '">'
								} else {
									html += '<a href="' + data.url + '" node="' + nodeIndex + '" menu-id="' + data.id + '">'
								}
								if (icon) {
									if ( !! data.icon) {
										flag = true;
										html += '<span class="tree-icon ' + data.icon + '"></span>'
									} else {
										html += '<span class="tree-icon icon-folder"></span>'
									}
								}
								html += data.name + '</a>';
								html += '</li>'
							}
						});
						html += '</ul>'
					}
				}
				function tree2(jsonData) {
					if (jsonData.length > 0) {
						var jsonArr = new Array();
						$.each(jsonData,
						function(i, data) {
							if (parseInt(data.parentId) < 1) {
								var childrenList = addChild(jsonData, data.id);
								data.childrenList = childrenList;
								jsonArr.push(data)
							}
						});
						tree(jsonArr)
					}
				}
				function addChild(jsonData, parentId) {
					var childArr = new Array();
					for (var i = 0; i < jsonData.length; i++) {
						if (jsonData[i].parentId == parentId) {
							var childrenList = addChild(jsonData, jsonData[i].id);
							jsonData[i].childrenList = childrenList;
							childArr.push(jsonData[i])
						}
					}
					return childArr
				}
				var html = '';
				if (opt.isShowAllSelect) {
					html += '<input type="checkbox" name="javaex-all-select" class="fill listen-' + id + '1" /> 全选'
				}
				if (parseInt(opt.type) == 1) {
					tree(jsonData)
				} else {
					tree2(jsonData)
				}
				$("#" + id).empty();
				$("#" + id).append(html);
				if (checkbox) {
					if (opt.isShowAllSelect) {
						$("script").each(function() {
							if ( !! $(this).attr("src")) {
								if ($(this).attr("src").indexOf("common.js") > -1) {
									var jsSrc = $(this).attr("src");
									var script = document.createElement("script");
									script.src = jsSrc;
									$(document.body).append(script)
								}
							}
						});
						$('#' + id + ' :checkbox[name="javaex-all-select"]').click(function() {
							changeCheckBoxStatus($(this))
						});
						callback()
					} else {
						$("#" + id + " :checkbox").each(function() {
							if ($(this).hasClass("fill")) {
								var text = $(this)[0].nextSibling.nodeValue;
								$(this)[0].nextSibling.nodeValue = "";
								$(this).wrap('<label class="fill-label"></label>');
								if (text != "" && text != null) {
									text = text.replace(/(\s*$)/g, "");
									$(this).parent().append('<span>' + text + '</span>')
								}
								if ($(this).siblings().length == 1) {
									$(this).after('<span class="fill-css icon-check" style="color: #fff;"></span>')
								}
							}
						})
					}
					$('#' + id + ' :checkbox[name="javaex-tree"]:checked').each(function() {
						if ($(this).parent().parent("li").attr("class") == "tree-child-li") {
							changeCheckBoxStatus($(this))
						}
					});
					$('#' + id + ' :checkbox[name="javaex-tree"]').click(function() {
						changeCheckBoxStatus($(this))
					})
				}
				function changeCheckBoxStatus(obj) {
					if (!obj.attr("class")) {
						return
					}
					var parentLi = obj.parent().parent();
					if (parentLi.hasClass("tree-parent-li")) {
						var sibLen = parentLi.siblings().length + 1;
						var checkedNum = 0;
						obj.siblings("span.icon-stop").removeClass("icon-stop").addClass("icon-check");
						if (obj.is(":checked")) {
							checkedNum++;
							parentLi.find("label").find("span.icon-stop").removeClass("icon-stop").addClass("icon-check");
							parentLi.find(":checkbox").attr("checked", true);
							obj.parent().parent("li").addClass("checked")
						} else {
							parentLi.find(":checkbox").attr("checked", false);
							obj.parent().parent("li").removeClass("checked")
						}
						parentLi.siblings("li").children("label").find(":checkbox").each(function() {
							if ($(this).is(":checked") && $(this).siblings("span.icon-check").length > 0) {
								checkedNum++
							}
						});
						var objLi = parentLi.parent().parent("li.tree-parent-li");
						if (objLi.length > 0) {
							if (checkedNum == sibLen) {
								objLi.children("label").find("span.icon-stop").removeClass("icon-stop").addClass("icon-check");
								objLi.children("label").find(":checkbox").attr("checked", true);
								objLi.addClass("checked")
							} else if (checkedNum == 0) {
								objLi.children("label").find(":checkbox").attr("checked", false);
								objLi.removeClass("checked")
							} else {
								objLi.children("label").find("span.icon-check").removeClass("icon-check").addClass("icon-stop");
								objLi.children("label").find(":checkbox").attr("checked", true);
								objLi.removeClass("checked")
							}
							changeParentCheckBoxStatus(objLi)
						}
					} else {
						var sibLen = parentLi.siblings().length + 1;
						var checkedNum = 0;
						if (obj.is(":checked")) {
							checkedNum++;
							obj.parent().parent("li").addClass("checked")
						} else {
							obj.parent().parent("li").removeClass("checked")
						}
						parentLi.siblings("li").children("label").find(":checkbox").each(function() {
							if ($(this).is(":checked") && $(this).siblings("span.icon-check").length > 0) {
								checkedNum++
							}
						});
						var objLi = parentLi.parent().parent("li.tree-parent-li");
						if (objLi.length > 0) {
							if (checkedNum == sibLen) {
								objLi.children("label").find("span.icon-stop").removeClass("icon-stop").addClass("icon-check");
								objLi.children("label").find(":checkbox").attr("checked", true);
								objLi.addClass("checked")
							} else if (checkedNum == 0) {
								objLi.children("label").find(":checkbox").attr("checked", false);
								objLi.removeClass("checked")
							} else {
								objLi.children("label").find("span.icon-check").removeClass("icon-check").addClass("icon-stop");
								objLi.children("label").find(":checkbox").attr("checked", true);
								objLi.removeClass("checked")
							}
							changeParentCheckBoxStatus(objLi)
						}
					}
					callback()
				}
				function changeParentCheckBoxStatus(obj) {
					var flag = false;
					var sibLen = obj.siblings().length + 1;
					var checkedNum = 0;
					var thisCheckBox = obj.children("label").find(":checkbox");
					if (thisCheckBox.is(":checked")) {
						checkedNum++;
						if (thisCheckBox.siblings("span.icon-check").length == 0) {
							flag = true
						}
					} else {
						obj.find(":checkbox").attr("checked", false)
					}
					obj.siblings("li").children("label").find(":checkbox").each(function() {
						if ($(this).is(":checked")) {
							checkedNum++;
							if ($(this).siblings("span.icon-check").length == 0) {
								flag = true
							}
						}
					});
					var objLi = obj.parent().parent("li.tree-parent-li");
					if (objLi.length > 0) {
						if (checkedNum == sibLen) {
							if (flag) {
								objLi.children("label").find("span.icon-check").removeClass("icon-check").addClass("icon-stop");
								objLi.children("label").find(":checkbox").attr("checked", true)
							} else {
								objLi.children("label").find("span.icon-stop").removeClass("icon-stop").addClass("icon-check");
								objLi.children("label").find(":checkbox").attr("checked", true)
							}
						} else if (checkedNum == 0) {
							objLi.children("label").find(":checkbox").attr("checked", false);
							objLi.removeClass("checked")
						} else {
							objLi.children("label").find("span.icon-check").removeClass("icon-check").addClass("icon-stop");
							objLi.children("label").find(":checkbox").attr("checked", true)
						}
						changeParentCheckBoxStatus(objLi)
					}
				}
				function callback() {
					var idArr = new Array();
					$('#' + id + ' :checkbox[name="javaex-tree"]:checked').each(function() {
						if (withoutNodeArr == null || $.inArray(parseInt($(this).attr("node")), withoutNodeArr) == -1) {
							idArr.push($(this).val())
						}
					});
					opt.callback({
						"idArr": idArr
					})
				}
				$("#" + id + " li.tree-parent-li").find(">ul>li").hide();
				if (icon && !flag) {
					$("#" + id + " li").each(function() {
						if ($(this).hasClass("tree-child-li")) {
							$(this).find(">a>span").addClass("icon-document-alt-fill").removeClass("icon-folder")
						}
					})
				}
				$("#" + id + " li.tree-parent-li").each(function() {
					if ($(this).attr("open")) {
						$(this).children("span").addClass("icon-caret-down").removeClass("icon-caret-right");
						if (icon && !flag) {
							$(this).children("a").children("span").addClass("icon-folder-open").removeClass("icon-folder")
						}
						$(this).children("ul").find(">li").show()
					}
				});
				$("#" + id + " li a").on("click",
				function(e) {
					$("#" + id + " li a").removeClass("on");
					$(this).addClass("on");
					opt.callback({
						"node": $(this).attr("node"),
						"id": $(this).attr("menu-id"),
						"name": $(this).text()
					})
				});
				$("#" + id + " li.tree-parent-li>span").on("click",
				function(e) {
					var children = $(this).siblings("ul").find(">li");
					if (children.is(":hidden")) {
						$(this).addClass("icon-caret-down").removeClass("icon-caret-right");
						if (icon && !flag) {
							$(this).siblings("a").children("span").addClass("icon-folder-open").removeClass("icon-folder")
						}
						children.show("fast")
					} else {
						$(this).addClass("icon-caret-right").removeClass("icon-caret-down");
						if (icon && !flag) {
							$(this).siblings("a").children("span").addClass("icon-folder").removeClass("icon-folder-open")
						}
						children.hide("fast")
					}
					e.stopPropagation()
				})
			},
			progress: function(args) {
				var opt = defaults(args);
				var percent = opt.percent;
				var selector = opt.selector;
				if (opt.isShowPercent || opt.isShowPercent == "true") {
					$(selector).html("<span>" + percent + "</span>")
				} else {
					$(selector).html(" ")
				}
				$(selector).css({
					"width": percent,
					"transition": "width 0.8s 0.1s"
				})
			},
			getTime: function(param) {
				var date = new Date();
				var year = date.getFullYear();
				var month = date.getMonth() + 1;
				var day = date.getDate();
				if (!param) {
					if (month >= 1 && month <= 9) {
						month = "0" + month
					}
					if (day >= 1 && day <= 9) {
						day = "0" + day
					}
					return year + "-" + month + "-" + day + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
				} else {
					param = param.toLowerCase();
					if (param == "year") {
						return year
					}
					if (param == "month") {
						return month
					}
					if (param == "day") {
						return day
					}
					if (month >= 1 && month <= 9) {
						month = "0" + month
					}
					if (day >= 1 && day <= 9) {
						day = "0" + day
					}
					if (param == "today") {
						return year + "-" + month + "-" + day
					}
					if (param == "week") {
						var week = date.getDay();
						if (week == 0) {
							week = 7
						}
						return week
					}
				}
			},
			getTimeDiff: function(startTime, endTime, type) {
				startTime = startTime.replace(/\-/g, "/");
				endTime = endTime.replace(/\-/g, "/");
				type = type.toLowerCase();
				var sTime = new Date(startTime);
				var eTime = new Date(endTime);
				var divNum = 1;
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
					break
				}
				return parseInt((eTime.getTime() - sTime.getTime()) / parseInt(divNum))
			},
			tip: function() {
				$("a, :button, span").each(function() {
					var tip = $(this).attr("tip");
					var tipWidth = $(this).attr("tip-width");
					if ( !! tip) {
						var html = '<div id="' + tip + '" class="javaex-tip" style="display: none;">' + tip + '</div>';
						$(this).append(html);
						$(this).css({
							"position": "relative",
							"overflow": "inherit"
						});
						if (!tipWidth) {
							tipWidth = parseInt($(this).find("#" + tip).width()) + 30
						}
						$(this).find("#" + tip).css({
							"width": tipWidth + "px",
							"margin-left": -(tipWidth / 2) + "px"
						});
						$(this).on("mouseover",
						function() {
							$(this).find("#" + tip).css("display", "block")
						});
						$(this).on("mouseout",
						function() {
							$(this).find("#" + tip).css("display", "none")
						})
					}
				})
			},
			comment: function(args) {
				var opt = defaults(args);
				var id = opt.id;
				var list = opt.list;
				var url = opt.url;
				var commentMapping = opt.commentMapping;
				var replyMapping = opt.replyMapping;
				attribute = args;
				var html = '';
				html += '<textarea class="comment-input original"></textarea>';
				html += '<div style="text-align:right;">';
				html += '<button class="button blue" onclick="javaex.javaexComment(this, attribute)">评论</button>';
				html += '</div>';
				html += '<div style="height:40px;line-height: 40px;border-bottom: 1px solid #eee;">';
				html += '共<span id="comment_count" style="color:#ff6fa2;">' + opt.commentCount + '</span>条评论';
				html += '</div>';
				html += '<ul class="comment-ul">';
				for (var i = 0; i < list.length; i++) {
					html += '<li id="' + list[i][commentMapping.commentId] + '">';
					html += '<div class="comment-left">';
					html += '<div class="avatar50">';
					if (list[i][commentMapping.avatar] == "" || list[i][commentMapping.avatar] == null) {
						html += '<a href="' + url + list[i][commentMapping.userId] + '" target="_blank" style="color:#21b7ef;"><img src="' + opt.avatar + '" class="face" /></a>'
					} else {
						html += '<a href="' + url + list[i][commentMapping.userId] + '" target="_blank" style="color:#21b7ef;"><img src="' + list[i][commentMapping.avatar] + '" class="face" /></a>'
					}
					html += '</div>';
					html += '</div>';
					html += '<div class="comment-right">';
					html += '<div><a href="' + url + list[i][commentMapping.userId] + '" target="_blank" style="color:#21b7ef;">' + list[i][commentMapping.userName] + '</a><input type="hidden" value="' + list[i][commentMapping.userId] + '" /></div>';
					html += '<div style="word-break: break-all;">' + list[i][commentMapping.content] + '</div>';
					html += '<div class="comment-time">';
					html += '<span style="color:#959595;">' + list[i][commentMapping.time] + '</span>';
					var replyList = list[i][commentMapping.replyInfoList];
					if (replyList.length == 0) {
						html += '<a href="javascript:;" onclick="javaex.javaexShowReplyTextarea1(this, attribute)" style="position:absolute; right:0;">回复</a>'
					}
					html += '</div>';
					if (replyList.length > 0) {
						html += '<div class="posr">';
						html += '<ul>';
						for (var j = 0; j < replyList.length; j++) {
							html += '<li>';
							html += '<div class="comment-left">';
							html += '<div class="avatar50">';
							if (replyList[j][replyMapping.avatar] == "" || replyList[j][replyMapping.avatar] == null) {
								html += '<a href="' + url + replyList[j][replyMapping.userId] + '" target="_blank" style="color:#21b7ef;"><img src="' + opt.avatar + '" class="face" /></a>'
							} else {
								html += '<a href="' + url + replyList[j][replyMapping.userId] + '" target="_blank" style="color:#21b7ef;"><img src="' + replyList[j][replyMapping.avatar] + '" class="face" /></a>'
							}
							html += '</div>';
							html += '</div>';
							html += '<div class="comment-right">';
							html += '<div><a href="' + url + replyList[j][replyMapping.userId] + '" target="_blank" style="color:#21b7ef;">' + replyList[j][replyMapping.userName] + '</a><input type="hidden" value="' + replyList[j][replyMapping.userId] + '" /></div>';
							if (replyList[j][replyMapping.toUserId] == list[i][commentMapping.userId]) {
								html += '<div style="word-break: break-all;">' + replyList[j][replyMapping.content] + '</div>'
							} else {
								html += '<div style="word-break: break-all;">回复<a href="' + url + replyList[j][replyMapping.toUserId] + '" target="_blank" style="color:#21b7ef;">@' + replyList[j][replyMapping.toUserName] + '</a>：' + replyList[j][replyMapping.content] + '</div>'
							}
							html += '<div class="comment-time">';
							html += '<span style="color:#959595;">' + replyList[j][replyMapping.time] + '</span>';
							html += '<a href="javascript:;" onclick="javaex.javaexShowReplyTextarea3(this, attribute)" style="position:absolute; right:0;">回复</a>';
							html += '</div>';
							html += '</div>';
							html += '<span class="clearfix"></span>';
							html += '</li>'
						}
						html += '</ul>';
						html += '<div style="text-align:right;">';
						html += '<a class="say-btn" href="javascript:;" onclick="javaex.javaexShowReplyTextarea2(this, attribute)">我也说一句</a>';
						html += '</div>'
					}
					html += '</div>';
					html += '</div>';
					html += '<span class="clearfix"></span>';
					html += '</li>'
				}
				html += '</ul>';
				$("#" + id).empty();
				$("#" + id).append(html)
			},
			javaexComment: function(obj, args) {
				var opt = defaults(args);
				var content = $(obj).parent().parent().find("textarea").val().replace(/<(script)[\S\s]*?\1>|<\/?(a|img)[^>]*>/gi, "");
				content = content.replace(/(^\s*)|(\s*$)/g, "");
				if (content == "") {
					info.optTip({
						content: "评论内容不能为空",
						type: "error"
					});
					return
				}
				opt.callback({
					"type": "comment",
					"content": content
				})
			},
			javaexShowReplyTextarea1: function(obj, args) {
				attribute = args;
				var posrLength = $(obj).parent().parent().find(".posr").length;
				if (posrLength == 0) {
					var html = '';
					html += '<div class="posr">';
					html += '<textarea class="comment-input original"></textarea>';
					html += '<div style="text-align:right;">';
					html += '<button class="button blue" onclick="javaex.javaexReply1(this, attribute)">回复</button>';
					html += '</div>';
					html += '</div>';
					$(obj).parent().after(html)
				} else {
					$(obj).parent().parent().find(".posr").remove()
				}
			},
			javaexReply1: function(obj, args) {
				var opt = defaults(args);
				var commentId = $(obj).parents("li").attr("id");
				var toUserId = $(obj).parent().parent().parent().children("div:first-child").children('input[type="hidden"]').val();
				var toUserName = $(obj).parent().parent().parent().children("div:first-child").text().replace(/(^\s*)|(\s*$)/g, "");
				var content = $(obj).parent().parent().find("textarea").val().replace(/<(script)[\S\s]*?\1>|<\/?(a|img)[^>]*>/gi, "");
				content = content.replace(/(^\s*)|(\s*$)/g, "");
				if (content == "") {
					info.optTip({
						content: "评论内容不能为空",
						type: "error"
					});
					return
				}
				opt.callback({
					"type": "reply",
					"commentId": commentId,
					"toUserId": toUserId,
					"toUserName": toUserName,
					"content": content
				})
			},
			javaexShowReplyTextarea2: function(obj, args) {
				attribute = args;
				var posrLength = $(obj).parent().parent().find(".posr").length;
				if (posrLength == 0) {
					var html = '';
					html += '<div class="posr">';
					html += '<textarea class="comment-input original"></textarea>';
					html += '<div style="text-align:right;">';
					html += '<button class="button blue" onclick="javaex.javaexReply2(this, attribute)">回复</button>';
					html += '</div>';
					html += '</div>';
					$(obj).parent().after(html)
				} else {
					$(obj).parent().parent().find(".posr").remove()
				}
			},
			javaexReply2: function(obj, args) {
				var opt = defaults(args);
				var commentId = $(obj).parents("li").attr("id");
				var toUserId = $(obj).parent().parent().parent().parent().children("div:first-child").children('input[type="hidden"]').val();
				var toUserName = $(obj).parent().parent().parent().parent().children("div:first-child").text().replace(/(^\s*)|(\s*$)/g, "");
				var content = $(obj).parent().parent().find("textarea").val().replace(/<(script)[\S\s]*?\1>|<\/?(a|img)[^>]*>/gi, "");
				content = content.replace(/(^\s*)|(\s*$)/g, "");
				if (content == "") {
					info.optTip({
						content: "评论内容不能为空",
						type: "error"
					});
					return
				}
				opt.callback({
					"type": "reply",
					"commentId": commentId,
					"toUserId": toUserId,
					"toUserName": toUserName,
					"content": content
				})
			},
			javaexShowReplyTextarea3: function(obj, args) {
				attribute = args;
				var posrLength = $(obj).parent().parent().find(".posr").length;
				if (posrLength == 0) {
					var html = '';
					html += '<div class="posr">';
					html += '<textarea class="comment-input original"></textarea>';
					html += '<div style="text-align:right;">';
					html += '<button class="button blue" onclick="javaex.javaexReply3(this, attribute)">回复</button>';
					html += '</div>';
					html += '</div>';
					$(obj).parent().after(html)
				} else {
					$(obj).parent().parent().find(".posr").remove()
				}
			},
			javaexReply3: function(obj, args) {
				var opt = defaults(args);
				var commentId = $(obj).parents("li").parents("li").attr("id");
				var toUserId = $(obj).parent().parent().parent().children("div:first-child").children('input[type="hidden"]').val();
				var toUserName = $(obj).parent().parent().parent().children("div:first-child").text().replace(/(^\s*)|(\s*$)/g, "");
				var content = $(obj).parent().parent().find("textarea").val().replace(/<(script)[\S\s]*?\1>|<\/?(a|img)[^>]*>/gi, "");
				content = content.replace(/(^\s*)|(\s*$)/g, "");
				if (content == "") {
					info.optTip({
						content: "评论内容不能为空",
						type: "error"
					});
					return
				}
				opt.callback({
					"type": "reply",
					"commentId": commentId,
					"toUserId": toUserId,
					"toUserName": toUserName,
					"content": content
				})
			},
			tag: function(args) {
				var opt = defaults(args);
				var id = opt.id;
				var maxNum = opt.maxNum;
				var html = '';
				html += '<div class="tagator" style="line-height: 20px;">';
				html += '<div class="tags" style="display: inline;"></div>';
				html += '<input class="tag-input" autocomplete="false" maxlength="20" placeholder="输入标签按回车保存" onkeydown="if(event.keyCode==13){javaex.saveTag(this.value, \'' + id + '\', \'' + maxNum + '\');}">';
				html += '</div>';
				$(".tagbox").append(html);
				var tagArr = opt.tags;
				if (tagArr != "" && tagArr != null) {
					var tag = "";
					var tagHtml = '';
					for (var i = 0; i < tagArr.length; i++) {
						if (i == 0) {
							tag = tagArr[i]
						} else {
							tag += "," + tagArr[i]
						}
						tagHtml += '<div class="tag">';
						tagHtml += '<span>' + tagArr[i] + '</span>';
						tagHtml += '<div class="tag-remove" onclick="javascript:javaex.removeTag(this, \'' + tagArr[i] + '\', \'' + id + '\');">×</div><div style="clear: both;"></div>';
						tagHtml += '</div>'
					}
					$("#" + id).val(tag);
					$(".tags").append(tagHtml)
				}
			},
			saveTag: function(tag, id, maxNum) {
				if (tag.length >= 20) {
					return false
				}
				tag = tag.replace(/(^\s*)|(\s*$)/g, "");
				if (tag == "") {
					return false
				}
				var result = $("#" + id).val();
				if (result == "") {
					$("#" + id).val(tag)
				} else {
					var arr = result.split(",");
					if (arr.length >= parseInt(maxNum)) {
						return false
					}
					for (var i = 0; i < arr.length; i++) {
						if (tag == arr[i]) {
							return false
						}
					}
					$("#" + id).val(result + "," + tag)
				}
				var html = '';
				html += '<div class="tag">';
				html += '<span>' + tag + '</span>';
				html += '<div class="tag-remove" onclick="javascript:javaex.removeTag(this, \'' + tag + '\', \'' + id + '\');">×</div><div style="clear: both;"></div>';
				html += '</div>';
				$(".tag-input").val("");
				$(".tags").append(html)
			},
			removeTag: function(obj, tag, id) {
				obj.parentNode.remove();
				var result = $("#" + id).val();
				var index = result.indexOf("," + tag);
				if (index == -1) {
					result = result.replace(tag + ",", "");
					result = result.replace(tag, "")
				} else {
					result = result.replace("," + tag, "")
				}
				$("#" + id).val(result)
			},
			filter: function(args) {
				var opt = defaults(args);
				var selector = opt.selector;
				callback();
				$(selector + " li").click(function() {
					$(this).addClass("on").siblings().removeClass("on");
					var arr = new Array();
					$(selector).each(function() {
						var ulId = $(this).attr("id");
						var liValue = $(this).children("li.on").val();
						arr.push(ulId + "=" + liValue)
					});
					opt.callback(arr)
				});
				function callback() {
					var arr = new Array();
					$(selector).each(function() {
						var ulId = $(this).attr("id");
						var liValue = $(this).children("li.on").val();
						arr.push(ulId + "=" + liValue)
					});
					opt.callback(arr)
				}
			},
			score: function(args) {
				var opt = defaults(args);
				var id = opt.id;
				var num = parseInt(opt.num);
				var scoreArr = opt.scoreArr;
				var isReadOnly = opt.isReadOnly;
				var size = opt.size;
				var liHtml = '';
				for (var i = 1; i <= num; i++) {
					liHtml += '<li index="' + i + '" score="' + scoreArr[i - 1] + '"><i class="star icon-star_border" style="font-size:' + size + 'px;"></i></li>'
				}
				liHtml += '<strong class="level-text"></strong>';
				$("#" + id).append(liHtml);
				scoreChange = function(elem, index) {
					return $(elem).each(function(i, scoreElem) {
						return $(scoreElem).find("i").each(function(i, item) {
							if (i <= index) {
								$(item).removeClass("icon-star_border");
								return $(item).addClass("icon-star")
							} else {
								$(item).removeClass("icon-star");
								return $(item).addClass("icon-star_border")
							}
						})
					})
				};
				var score = opt.score;
				if (score != "") {
					$("#" + id + " li").each(function() {
						if ($(this).attr("score") == score) {
							$("#" + id).addClass("active");
							var index = $(this).attr("index");
							index--;
							$(this).parent().find(".level-text").html(opt.levelTextArr[index]);
							scoreChange($("#" + id), index);
							return false
						}
					})
				}
				if (!isReadOnly) {
					$("#" + id + " li").hover(function() {
						var index = $(this).attr("index") | 0;
						if (parseInt(index) <= 0) {
							return
						}
						index--;
						$(this).parent().find(".level-text").html(opt.levelTextArr[index]);
						return scoreChange($(this).parent(), index)
					});
					$("#" + id).mouseleave(function() {
						$(this).addClass("active");
						var index = $(this).attr("active") | 0;
						index--;
						if (!isReadOnly) {
							$(this).parent().find(".level-text").html("")
						}
						return scoreChange(this, index)
					});
					$("#" + id + " li").click(function() {
						var index = $(this).attr("index") | 0;
						if (parseInt(index) <= 0) {
							return
						}
						$("#" + id).attr("active", index);
						scoreChange($("#" + id), index - 1);
						opt.callback({
							"index": index,
							"score": $(this).attr("score")
						})
					})
				}
			},
			goTopBtn: function(args) {
				var opt = defaults(args);
				var id = opt.id;
				$("#" + id).click(function() {
					$("body, html").animate({
						scrollTop: 0
					},
					500)
				});
				$(window).scroll(function() {
					var sc = $(window).scrollTop();
					if (sc > 300) {
						$("#" + id).css("display", "block")
					} else {
						$("#" + id).css("display", "none")
					}
				})
			},
			alert: function(args) {
				var opt = defaults(args);
				var width = parseInt(opt.width);
				var height = "";
				if (opt.height != "") {
					height = parseInt(opt.height)
				}
				if (opt.mask == true || opt.mask == "true") {
					info.addMask()
				}
				var UUID = info.generateID();
				if (opt.id != "") {
					UUID = opt.id
				}
				var alertHtml = '<div id=' + UUID + ' class="dialog animated zoomIn" style="width:' + width + 'px;top:' + opt.top + ';left:' + (document.documentElement.clientWidth - width) / 2 + 'px;">';
				alertHtml += '<div id="dialog-top-' + UUID + '" class="dialog-top">';
				alertHtml += '<div class="dialog-title">' + opt.title + '</div>';
				if (opt.closeIcon == true || opt.closeIcon == "true") {
					alertHtml += '<div class="dialog-close-icon" onclick="javaex.close(\'' + UUID + '\');"><span class="close"><span></div>'
				}
				alertHtml += '</div>';
				if ( !! height) {
					alertHtml += '<div class="dialog-content" style="overflow: auto;max-height:' + height + 'px;text-align:' + opt.textAlign + ';">'
				} else {
					alertHtml += '<div class="dialog-content" style="text-align:' + opt.textAlign + ';">'
				}
				alertHtml += opt.content;
				alertHtml += '</div>';
				alertHtml += '<div class="dialog-footer">';
				alertHtml += '<div class="dialog-btn-container">';
				alertHtml += '<button class="dialog-btn dialog-btn-true" onclick="if(' + opt.callback + '!=false)javaex.close(\'' + UUID + '\');">' + opt.confirmName + '</button>';
				alertHtml += '</div>';
				alertHtml += '</div>';
				alertHtml += '</div>';
				$(document.body).append(alertHtml);
				var oDialog = document.getElementById(UUID);
				var oDrag = document.getElementById("dialog-top-" + UUID);
				info.drag(oDialog, oDrag)
			},
			confirm: function(args) {
				var opt = defaults(args);
				var width = parseInt(opt.width);
				if (opt.mask == true || opt.mask == "true") {
					info.addMask()
				}
				var UUID = info.generateID();
				var confirmHtml = '<div id=' + UUID + ' class="dialog animated zoomIn" style="width:' + width + 'px;top:' + opt.top + ';left:' + (document.documentElement.clientWidth - width) / 2 + 'px;">';
				confirmHtml += '<div id="dialog-top-' + UUID + '" class="dialog-top">';
				confirmHtml += '<div class="dialog-title">' + opt.title + '</div>';
				if (opt.closeIcon == true || opt.closeIcon == "true") {
					confirmHtml += '<div class="dialog-close-icon" onclick="javaex.close(\'' + UUID + '\');"><span class="close"><span></div>'
				}
				confirmHtml += '</div>';
				confirmHtml += '<div class="dialog-content" style="text-align:' + opt.textAlign + ';">';
				confirmHtml += opt.content;
				confirmHtml += '</div>';
				confirmHtml += '<div class="dialog-footer">';
				confirmHtml += '<div class="dialog-btn-container">';
				confirmHtml += '<button class="dialog-btn dialog-btn-true" onclick="if(' + opt.callback + '!=false)javaex.close(\'' + UUID + '\');">' + opt.confirmName + '</button>';
				confirmHtml += '<button class="dialog-btn dialog-btn-false" onclick="javaex.close(\'' + UUID + '\');">' + opt.cancelName + '</button>';
				confirmHtml += '</div>';
				confirmHtml += '</div>';
				confirmHtml += '</div>';
				$(document.body).append(confirmHtml);
				var oDialog = document.getElementById(UUID);
				var oDrag = document.getElementById("dialog-top-" + UUID);
				info.drag(oDialog, oDrag)
			},
			deleteDialog: function(obj, args) {
				$(".danger-dialog").remove();
				var opt = defaults(args);
				var left = obj.getBoundingClientRect().left + document.documentElement.scrollLeft;
				var top = obj.getBoundingClientRect().top + document.documentElement.scrollTop;
				var UUID = info.generateID();
				var followHtml = '<div id=' + UUID + ' class="danger-dialog" style="left:' + parseInt(left - 186 + (obj.offsetWidth / 2) + 30) + 'px;top:' + parseInt(top + obj.offsetHeight + 3) + 'px;">';
				followHtml += '<div class="danger-dialog-wrapper">';
				followHtml += '<div class="danger-dialog-wrapper-content">';
				followHtml += opt.content;
				followHtml += '</div>';
				followHtml += '<div class="danger-dialog-wrapper-tip">';
				followHtml += opt.tip;
				followHtml += '</div>';
				followHtml += '<div class="danger-dialog-wrapper-button">';
				followHtml += '<button class="danger" style="outline:none;" onclick="if(' + opt.callback + '!=false)javaex.close(\'' + UUID + '\');">' + opt.confirmName + '</button>';
				followHtml += '<button style="outline:none;" onclick="javaex.close(\'' + UUID + '\');">' + opt.cancelName + '</button>';
				followHtml += '</div>';
				followHtml += '</div>';
				followHtml += '</div>';
				$(document.body).append(followHtml)
			},
			followDialog: function(obj, args) {
				$(".panel").remove();
				var opt = defaults(args);
				var width = parseInt(opt.width);
				var type = opt.type;
				var position = opt.position;
				var left = obj.getBoundingClientRect().left + document.documentElement.scrollLeft;
				var top = obj.getBoundingClientRect().top + document.documentElement.scrollTop;
				var followHtml = '';
				if (position == "down") {
					if (type == "arrow") {
						if (opt.alignment == "left") {
							followHtml += '<div class="panel alignment-left" style="left:' + (left - 30 - 9 + (obj.offsetWidth / 2)) + 'px;top:' + (top + obj.offsetHeight + 3) + 'px;width:' + width + 'px;">'
						} else {
							followHtml += '<div class="panel alignment-right" style="left:' + (left + (obj.offsetWidth / 2) - width + 30 + 9) + 'px;top:' + (top + obj.offsetHeight + 3) + 'px;width:' + width + 'px;">'
						}
					} else {
						if (opt.alignment == "left") {
							followHtml += '<div class="panel" style="left:' + left + 'px;top:' + (top + obj.offsetHeight + 3) + 'px;width:' + width + 'px;">'
						} else {
							followHtml += '<div class="panel" style="left:' + (left + obj.offsetWidth - width) + 'px;top:' + (top + obj.offsetHeight + 3) + 'px;width:' + width + 'px;">'
						}
					}
				} else if (position == "right") {
					followHtml += '<div class="panel arrow-left" style="left:' + (left + obj.offsetWidth + 3) + 'px;width:' + width + 'px;">'
				}
				followHtml += opt.content;
				followHtml += '</div>';
				$(document.body).append(followHtml);
				if (position == "right") {
					$(".panel").css("top", (top + obj.offsetHeight / 2 - $(".panel").height() / 2) + "px");
					$('head').append('<style>.panel.arrow-left:before{left:-8px;top:' + ($(".panel").height() / 2 - 9) + 'px;}</style>')
				}
				$(document).mouseup(function(event) {
					var obj = $(".panel");
					if (!obj.is(event.target) && obj.has(event.target).length == 0) {
						$(".panel").remove()
					}
				})
			},
			optTip: function(args) {
				var opt = defaults(args);
				var tipHtml = '';
				var type = opt.type;
				tipHtml = '';
				if (type == "submit") {
					$(".opt-tip").remove();
					tipHtml += '<div class="mask" style="background:none;"></div>';
					tipHtml += '<div class="opt-tip animated fadeInDown" style="top: 40px; left: 50%;">';
					tipHtml += '<div style="display: flex;">';
					tipHtml += '<span class="tip-icon tip-icon-loading"></span>';
					tipHtml += '<span class="tip-msg">' + opt.content + '</span>';
					tipHtml += '</div>';
					tipHtml += '</div>'
				} else if (type == "success" || type == "") {
					if ($(".tip-icon-loading").length > 0) {
						$(".opt-tip").css("background-color", "#79c37b");
						$(".opt-tip .tip-icon").removeClass("tip-icon-loading");
						$(".opt-tip .tip-icon").addClass("icon-check");
						$(".opt-tip .tip-icon").css({
							"font-size": "16px",
							"font-weight": "bold"
						});
						$(".opt-tip .tip-msg").text(opt.content)
					} else {
						$(".opt-tip").remove();
						tipHtml += '<div class="opt-tip animated fadeInDown" style="top: 40px; left: 50%; background-color:#79c37b;">';
						tipHtml += '<div style="display: flex;">';
						tipHtml += '<span class="tip-icon icon-check" style="font-size:16px; font-weight:bold;"></span>';
						tipHtml += '<span class="tip-msg">' + opt.content + '</span>';
						tipHtml += '</div>';
						tipHtml += '</div>'
					}
				} else if (type == "error") {
					if ($(".tip-icon-loading").length > 0) {
						$(".opt-tip").css("background-color", "#ff6e6e");
						$(".opt-tip .tip-icon").removeClass("tip-icon-loading");
						$(".opt-tip .tip-icon").addClass("icon-close");
						$(".opt-tip .tip-icon").css({
							"font-size": "16px",
							"font-weight": "bold"
						});
						$(".opt-tip .tip-msg").text(opt.content)
					} else {
						$(".opt-tip").remove();
						tipHtml += '<div class="opt-tip animated fadeInDown" style="top: 40px; left: 50%; background-color:#ff6e6e;">';
						tipHtml += '<div style="display: flex;">';
						tipHtml += '<span class="tip-icon icon-close" style="font-size:16px; font-weight:bold;"></span>';
						tipHtml += '<span class="tip-msg">' + opt.content + '</span>';
						tipHtml += '</div>';
						tipHtml += '</div>'
					}
				}
				$(document.body).append(tipHtml);
				var tipWidth = $(".opt-tip").width();
				$(".opt-tip").css("margin-left", -(tipWidth / 2) + "px");
				if (type == "success" || type == "error") {
					setTimeout(function() {
						$(".opt-tip").removeClass("fadeInDown");
						$(".opt-tip").addClass("zoomOut");
						$(".opt-tip").remove();
						$(".mask").remove()
					},
					opt.live)
				}
			},
			loading: function(args) {
				var opt = defaults(args);
				var content = opt.content;
				if (content == "") {
					$(document.body).append('<div id="javaex-loading">正在读取数据，请稍候...</div>')
				} else {
					$(document.body).append('<div id="javaex-loading">' + content + '</div>')
				}
				document.onreadystatechange = subSomething;
				function subSomething() {
					if (document.readyState == "complete") {
						var oLoading = document.getElementById("javaex-loading");
						if (oLoading != null) {
							oLoading.remove();
							opt.callback({
								"code": "000000"
							})
						}
					}
				}
			},
			num: 0,
			dialog: function(args) {
				var opt = defaults(args);
				var width = parseInt(opt.width);
				var height = opt.height;
				if (height != "") {
					height = parseInt(height)
				}
				var isBackground = opt.isBackground;
				var type = opt.type;
				attribute = args;
				var UUID = info.generateID();
				if (opt.id != "") {
					UUID = opt.id
				}
				var dialogHtml = '';
				if (type == "image") {
					info.addMask();
					var image = new Image();
					image.src = opt.url;
					var maxWidth = document.documentElement.clientWidth - 40;
					var maxHeight = document.documentElement.clientHeight - 40;
					var arr = info.autoWidthHeight(image.width, image.height, maxWidth, maxHeight);
					width = arr[0];
					height = arr[1];
					dialogHtml = '<div id=' + UUID + ' class="dialog animated zoomIn" style="width:' + width + 'px;height:' + height + 'px;left:' + (maxWidth - width) / 2 + 'px;">';
					dialogHtml += '<div id="dialog-content-' + UUID + '" class="dialog-content full">';
					dialogHtml += '<img src="' + opt.url + '" />';
					dialogHtml += '</div>';
					dialogHtml += '<a class="close2" href="javascript:;" onclick="javaex.close(\'' + UUID + '\');"></a>';
					dialogHtml += '</div>'
				} else if (type == "images") {
					var selector = opt.selector;
					$(selector).each(function(i) {
						if ($(this).attr("src") == opt.url) {
							info.num = i
						}
					});
					var image = new Image();
					image.src = opt.url;
					var maxWidth = document.documentElement.clientWidth;
					var maxHeight = document.documentElement.clientHeight;
					var arr = info.autoWidthHeight(image.width, image.height, maxWidth, maxHeight);
					width = arr[0];
					height = arr[1];
					dialogHtml = '<div class="allcover"></div>';
					dialogHtml += '<div id="' + UUID + '" class="area-window">';
					dialogHtml += '<div id="box-image-manga" style="width:' + width + 'px;height:' + height + 'px;left:' + (maxWidth - width) / 2 + 'px;top:' + (maxHeight - height) / 2 + 'px;">';
					dialogHtml += '<img id="img-' + UUID + '" src="' + opt.url + '" style="opacity: 1;">';
					dialogHtml += '</div>';
					dialogHtml += '<div class="prev-image" title="上一张" onclick="javaex.lastImg(\'' + UUID + '\', \'' + selector + '\');">';
					dialogHtml += '<i class="icon icon-chevron-circle-left"></i>';
					dialogHtml += '</div>';
					dialogHtml += '<div class="next-image" title="下一张" onclick="javaex.nextImg(\'' + UUID + '\', \'' + selector + '\');">';
					dialogHtml += '<i class="icon icon-chevron-circle-right"></i>';
					dialogHtml += '</div>';
					dialogHtml += '<div class="area-tool-image">';
					dialogHtml += '<a id="btn-quit-image" class="button red" href="javascript:;" onclick="javaex.close(\'' + UUID + '\');">';
					dialogHtml += '<i class="icon icon-cancel" style="vertical-align: middle;height: 30px;line-height: 28px;font-size: 16px;"></i>退出读图模式';
					dialogHtml += '</a>';
					dialogHtml += '</div>';
					dialogHtml += '</div>'
				} else if (type == "login") {
					info.addMask2();
					dialogHtml = '<div id=' + UUID + ' class="dialog animated zoomIn" style="width:' + width + 'px;left:' + (document.documentElement.clientWidth - width) / 2 + 'px;">';
					dialogHtml += '<div id="dialog-content-' + UUID + '" class="dialog-content" style="padding:0;height:' + height + 'px;">';
					dialogHtml += '<iframe src="' + opt.url + '" width="100%" height="100%" frameborder="0" scrolling="no" style="overflow: visible;border: 0;"></iframe>';
					dialogHtml += '</div>';
					dialogHtml += '<a class="close2" href="javascript:;" onclick="javaex.close(\'' + UUID + '\');"></a>';
					dialogHtml += '</div>'
				} else if (type == "window") {
					if (opt.mask == true || opt.mask == "true") {
						info.addMask()
					}
					dialogHtml = '<div id=' + UUID + ' class="dialog animated zoomIn" style="width:' + width + 'px;top:' + (document.documentElement.clientHeight - height) / 2 + 'px;left:' + (document.documentElement.clientWidth - width) / 2 + 'px;height:' + height + 'px;">';
					dialogHtml += '<div class="dialog-top">';
					dialogHtml += '<div id="dialog-title-' + UUID + '" class="dialog-title">' + opt.title + '</div>';
					dialogHtml += '<div id="dialog-min-' + UUID + '" class="dialog-min-icon" onclick="javaex.min(\'' + UUID + '\');"><span class="min"><span></div>';
					dialogHtml += '<div id="dialog-max-' + UUID + '" class="dialog-max-icon" onclick="javaex.max(\'' + UUID + '\');"><span class="max"><span></div>';
					dialogHtml += '<div id="dialog-revert-' + UUID + '" style="display:none;" class="dialog-revert-icon" onclick="javaex.revert(\'' + UUID + '\', attribute);"><span class="revert"><span></div>';
					dialogHtml += '<div class="dialog-close-icon" onclick="javaex.close(\'' + UUID + '\');"><span class="close"><span></div>';
					dialogHtml += '</div>';
					if (isBackground) {
						dialogHtml += '<div id="dialog-content-' + UUID + '" class="dialog-content full" style="height:' + (height - 80) + 'px;overflow-y:hidden;">'
					} else {
						dialogHtml += '<div id="dialog-content-' + UUID + '" class="dialog-content" style="height:' + (height - 80) + 'px;overflow-y:hidden;">'
					}
					dialogHtml += '<iframe src="' + opt.url + '" width="100%" height="100%" frameborder="0" scrolling="' + opt.scrolling + '" style="overflow: visible;border: 0;"></iframe>';
					dialogHtml += '</div>';
					dialogHtml += '<div id="dialog-resize-' + UUID + '" class="resize" onmousemove="javaex.resize(\'' + UUID + '\', attribute);"></div>';
					dialogHtml += '</div>'
				}
				$(document.body).append(dialogHtml);
				var oDialog = document.getElementById(UUID);
				if (type == "login") {
					var heightDifference = document.documentElement.clientHeight - oDialog.offsetHeight;
					oDialog.style.top = (heightDifference / 2) + "px"
				} else if (type == "image") {
					$("#dialog-content-" + UUID).css("height", ($("#" + UUID).height() - 40) + "px");
					var heightDifference = document.documentElement.clientHeight - oDialog.offsetHeight;
					oDialog.style.top = (heightDifference / 2) + "px";
					$(".mask").click(function() {
						info.close(UUID)
					})
				} else if (type == "window") {
					var oDrag = document.getElementById("dialog-title-" + UUID);
					info.drag(oDialog, oDrag)
				}
			},
			autoWidthHeight: function(width, height, maxWidth, maxHeight) {
				if (width < maxWidth && height < maxHeight) {} else {
					if (maxWidth / maxHeight <= width / height) {
						width = maxWidth;
						height = maxWidth * (height / width)
					} else {
						width = maxHeight * (width / height);
						height = maxHeight
					}
				}
				var arr = new Array(width, height);
				return arr
			},
			lastImg: function(UUID, selector) {
				info.num--;
				if (info.num >= 0) {
					$("#img-" + UUID).css({
						"opacity": 0,
						"transition": "opacity 200ms ease 0s"
					});
					setTimeout(function() {
						var image = new Image();
						image.src = $(selector).eq(info.num).attr("src");
						var maxWidth = document.documentElement.clientWidth;
						var maxHeight = document.documentElement.clientHeight;
						var arr = info.autoWidthHeight(image.width, image.height, maxWidth, maxHeight);
						width = arr[0];
						height = arr[1];
						$("#box-image-manga").css({
							"width": width + "px",
							"height": height + "px",
							"left": (maxWidth - width) / 2 + "px",
							"top": (maxHeight - height) / 2 + "px"
						});
						$("#img-" + UUID).attr("src", image.src);
						$("#img-" + UUID).css({
							"opacity": 1,
							"transition": ""
						})
					},
					200)
				} else {
					info.num = $(selector).length - 2;
					info.nextImg(UUID, selector)
				}
			},
			nextImg: function(UUID, selector) {
				info.num++;
				if (info.num < $(selector).length) {
					$("#img-" + UUID).css({
						"opacity": 0,
						"transition": "opacity 200ms ease 0s"
					});
					setTimeout(function() {
						var image = new Image();
						image.src = $(selector).eq(info.num).attr("src");
						var maxWidth = document.documentElement.clientWidth;
						var maxHeight = document.documentElement.clientHeight;
						var arr = info.autoWidthHeight(image.width, image.height, maxWidth, maxHeight);
						width = arr[0];
						height = arr[1];
						$("#box-image-manga").css({
							"width": width + "px",
							"height": height + "px",
							"left": (maxWidth - width) / 2 + "px",
							"top": (maxHeight - height) / 2 + "px"
						});
						$("#img-" + UUID).attr("src", image.src);
						$("#img-" + UUID).css({
							"opacity": 1,
							"transition": ""
						})
					},
					200)
				} else {
					info.num = -1;
					info.nextImg(UUID, selector)
				}
			},
			resize: function(UUID, args) {
				var opt = defaults(args);
				var dragMinWidth = parseInt(opt.width);
				var dragMinHeight = parseInt(opt.height);
				var oDialog = document.getElementById(UUID);
				var oResize = document.getElementById("dialog-resize-" + UUID);
				oResize.onmousedown = function(event) {
					var oEvent = event || window.event;
					var absX = oEvent.clientX - oResize.offsetLeft;
					var absY = oEvent.clientY - oResize.offsetTop;
					document.onmousemove = function(eve) {
						var oEve = eve || window.event;
						var offsetLeft = oEve.clientX - absX;
						var offsetTop = oEve.clientY - absY;
						var maxWidth = document.documentElement.clientWidth - oDialog.offsetLeft - 2;
						var maxHeight = document.documentElement.clientHeight - oDialog.offsetTop - 2;
						var offsetWidth = oResize.offsetWidth + offsetLeft;
						var offsetHeight = oResize.offsetHeight + offsetTop;
						if (offsetWidth < dragMinWidth) {
							offsetWidth = dragMinWidth
						}
						if (offsetWidth > maxWidth) {
							offsetWidth = maxWidth
						}
						oDialog.style.width = offsetWidth + "px";
						if (offsetHeight < dragMinHeight) {
							offsetHeight = dragMinHeight
						}
						if (offsetHeight > maxHeight) {
							offsetHeight = maxHeight
						}
						oDialog.style.height = offsetHeight + "px";
						document.getElementById("dialog-content-" + UUID).style.height = (offsetHeight - 80) + "px";
						return false
					};
					document.onmouseup = function() {
						document.onmousemove = null;
						document.onmouseup = null
					};
					return false
				}
			},
			min: function(UUID) {
				var oMin = document.getElementById("dialog-min-" + UUID);
				oMin.style.display = "none";
				var oResize = document.getElementById("dialog-resize-" + UUID);
				oResize.style.display = "none";
				var oMax = document.getElementById("dialog-max-" + UUID);
				oMax.style.display = "none";
				var oRevert = document.getElementById("dialog-revert-" + UUID);
				oRevert.style.display = "block";
				var oContent = document.getElementById("dialog-content-" + UUID);
				oContent.style.display = "none";
				var oDialog = document.getElementById(UUID);
				oDialog.style.left = "0";
				oDialog.style.width = "260px";
				oDialog.style.height = "40px";
				offsetTop = document.documentElement.clientHeight - oDialog.offsetHeight;
				oDialog.style.top = offsetTop + "px"
			},
			max: function(UUID) {
				var oMax = document.getElementById("dialog-max-" + UUID);
				oMax.style.display = "none";
				var oResize = document.getElementById("dialog-resize-" + UUID);
				oResize.style.display = "none";
				var oMin = document.getElementById("dialog-min-" + UUID);
				oMin.style.display = "block";
				var oRevert = document.getElementById("dialog-revert-" + UUID);
				oRevert.style.display = "block";
				var oDialog = document.getElementById(UUID);
				oDialog.style.top = "0";
				oDialog.style.left = "0";
				oDialog.style.width = document.documentElement.clientWidth - 2 + "px";
				oDialog.style.height = document.documentElement.clientHeight - 2 + "px";
				var oContent = document.getElementById("dialog-content-" + UUID);
				oContent.style.display = "block";
				oContent.style.height = document.documentElement.clientHeight - 2 - 80 + "px"
			},
			revert: function(UUID, args) {
				var opt = defaults(args);
				var width = parseInt(opt.width);
				var height = parseInt(opt.height);
				var oMin = document.getElementById("dialog-min-" + UUID);
				oMin.style.display = "block";
				var oRevert = document.getElementById("dialog-revert-" + UUID);
				oRevert.style.display = "none";
				var oMax = document.getElementById("dialog-max-" + UUID);
				oMax.style.display = "block";
				var oResize = document.getElementById("dialog-resize-" + UUID);
				oResize.style.display = "block";
				var oDialog = document.getElementById(UUID);
				oDialog.style.top = opt.top;
				oDialog.style.left = (document.documentElement.clientWidth - width) / 2 + "px";
				oDialog.style.width = width + "px";
				oDialog.style.height = height + "px";
				oDialog.style.top = (document.documentElement.clientHeight - height) / 2 + "px";
				var oContent = document.getElementById("dialog-content-" + UUID);
				oContent.style.display = "block";
				oContent.style.height = (height - 80) + "px"
			},
			close: function(UUID) {
				if (!UUID) {
					$(".dialog").removeClass("zoomIn");
					$(".dialog").addClass("zoomOut");
					$(".mask").remove();
					setTimeout(function() {
						$(".dialog").remove()
					},
					300)
				} else {
					if ($("#" + UUID).hasClass("danger-dialog") || $("#" + UUID).hasClass("area-window")) {
						$("#" + UUID).remove();
						$(".allcover").remove()
					} else {
						$("#" + UUID).removeClass("zoomIn");
						$("#" + UUID).addClass("zoomOut");
						$(".mask").remove();
						setTimeout(function() {
							$("#" + UUID).remove()
						},
						300)
					}
				}
			},
			addMask: function() {
				$(document.body).append('<div class="mask"></div>')
			},
			addMask2: function() {
				$(document.body).append('<div class="mask" style="background:none;"></div>')
			},
			drag: function(oDialog, oDrag) {
				oDrag.onmousedown = function(event) {
					var oEvent = event || window.event;
					var absX = oEvent.clientX - oDialog.offsetLeft;
					var absY = oEvent.clientY - oDialog.offsetTop;
					document.onmousemove = function(eve) {
						var oEve = eve || window.event;
						var offsetLeft = oEve.clientX - absX;
						var offsetTop = oEve.clientY - absY;
						if (offsetLeft <= 0) {
							offsetLeft = 0
						} else if (offsetLeft >= (document.documentElement.clientWidth - oDialog.offsetWidth)) {
							offsetLeft = document.documentElement.clientWidth - oDialog.offsetWidth
						}
						if (offsetTop <= 0) {
							offsetTop = 0
						} else if (offsetTop >= (document.documentElement.clientHeight - oDialog.offsetHeight)) {
							offsetTop = document.documentElement.clientHeight - oDialog.offsetHeight
						}
						oDialog.style.left = offsetLeft + "px";
						oDialog.style.top = offsetTop + "px"
					};
					document.onmouseup = function() {
						document.onmousemove = null;
						document.onmouseup = null
					}
				}
			},
			popin: function() {
				$(".pop-in").each(function() {
					$(this).css("animation-delay", Math.random() + "s")
				})
			},
			render: function(id) {
				if ( !! id) {
					if ( !! $('#' + id).attr("class")) {
						var classArr = $('#' + id).attr("class").split(" ");
						for (var i = 0; i < classArr.length; i++) {
							if (classArr[i].indexOf("equal-") >= 0) {
								var num = classArr[i].split("-")[1];
								$('#' + id).children("li").css("width", (100 / num) + "%")
							}
						}
						return
					}
					if ( !! $('#' + id).attr("class")) {
						var classArr = $('#' + id).attr("class").split(" ");
						for (var i = 0; i < classArr.length; i++) {
							if (classArr[i].indexOf("grid-") >= 0) {
								var arr = classArr[i].split("-");
								var sum = 0;
								for (var j in arr) {
									if (j > 0) {
										sum = parseInt(sum) + parseInt(arr[j])
									}
								}
								$('#' + id).children("div").each(function(k) {
									$(this).css("width", (100 / sum) * arr[k + 1] + "%")
								})
							} else if (classArr[i].indexOf("spacing-") >= 0) {
								var spacing = classArr[i].split("-")[1];
								var width = "calc(100% + " + parseInt(spacing) + "px)";
								$('#' + id).css("width", width);
								$('#' + id).children("div").each(function(k) {
									$(this).css("margin-right", parseInt(spacing) + "px")
								})
							}
						}
					}
				} else {
					$("script").each(function() {
						if ( !! $(this).attr("src")) {
							if ($(this).attr("src").indexOf("common.js") > -1) {
								var jsSrc = $(this).attr("src");
								var script = document.createElement("script");
								script.src = jsSrc;
								$(document.body).append(script)
							}
							if ($(this).attr("src").indexOf("javaex-formVerify.js") > -1) {
								var jsSrc = $(this).attr("src");
								var script = document.createElement("script");
								script.src = jsSrc;
								$(document.body).append(script)
							}
						}
					})
				}
			},
			nav: function(args) {
				var opt = defaults(args);
				var navId = opt.id;
				if (opt.isAutoSelected) {
					var flag = false;
					var url = window.location.href;
					navSelected(url);
					if (flag == false) {
						var href = $("#" + navId + " li>a").attr("href");
						var host = window.location.host;
						if (url == ("http://" + host + href + "/") || url == ("https://" + host + href + "/") || url == ("http://" + host + href) || url == ("https://" + host + href)) {
							delCookie("navUrl")
						} else {
							var url = getCookie("navUrl");
							navSelected(url)
						}
					}
				}
				function navSelected(url) {
					$("#" + navId + " li>a").each(function() {
						var href = $(this).attr("href");
						if (url.indexOf(href) >= 0) {
							flag = true;
							setCookie("navUrl", url);
							$(this).parent("li").addClass("active").siblings("li").removeClass("active")
						}
					})
				}
				function setCookie(key, value) {
					document.cookie = key + "=" + value + "; path=/; expires=-1"
				}
				function getCookie(key) {
					var keyName = key + "=";
					var arr = document.cookie.split("; ");
					for (var i = 0; i < arr.length; i++) {
						var cookieName = arr[i].trim();
						if (cookieName.indexOf(keyName) == 0) {
							return cookieName.substring(keyName.length, cookieName.length)
						}
					}
					return ""
				}
				function delCookie(key) {
					var exp = new Date();
					exp.setTime(exp.getTime() - 1);
					var cval = getCookie(key);
					if (cval != null) {
						document.cookie = key + "=" + cval + ";expires=" + exp.toGMTString()
					}
				}
			},
			iframeMenu: function(args) {
				$(".admin-iframe-content ul.menu>li>a").click(function() {
					$(".admin-iframe-content ul.menu>li.active").removeClass("active");
					$(this).parent("li").addClass("active")
				})
			},
			menu: function(args) {
				var opt = defaults(args);
				var menuId = opt.id;
				$("#" + menuId + " .menu-item>a").on("click",
				function() {
					if ($(this).next().css("display") == "none") {
						$(".menu-item").children("ul").slideUp(300);
						$(this).next("ul").slideDown(300);
						$(this).parent("li").addClass("menu-show").siblings("li").removeClass("menu-show")
					} else {
						if ($(this).next("ul").length == 0) {
							$(".menu-item.menu-show ul").slideUp(300)
						} else {
							$(this).next("ul").slideUp(300)
						}
						$(".menu-item.menu-show").removeClass("menu-show")
					}
				});
				$("#" + menuId + " li.menu-item>a").click(function() {
					addHover($(this).parent())
				});
				$("#" + menuId + " li.menu-item ul li>a").click(function() {
					addHover($(this).parent())
				});
				function addHover(obj) {
					$("#" + menuId + " li.menu-item").removeClass("hover");
					$("#" + menuId + " li.menu-item ul li").removeClass("hover");
					obj.addClass("hover")
				}
				if (opt.isAutoSelected) {
					var flag = false;
					var url = window.location.href;
					menuSelected(url);
					if (flag == false) {
						var href = $("#header a").attr("href");
						var host = window.location.host;
						if (url == ("http://" + host + href + "/") || url == ("https://" + host + href + "/") || url == ("http://" + host + href) || url == ("https://" + host + href)) {
							delCookie("adminMenuUrl")
						} else {
							var url = getCookie("adminMenuUrl");
							menuSelected(url)
						}
					}
				}
				function menuSelected(url) {
					$("#" + menuId + " li").each(function() {
						var href = $(this).children().first().attr("href");
						if (url.indexOf(href) >= 0) {
							flag = true;
							setCookie("adminMenuUrl", url);
							if ($(this).hasClass("menu-item")) {
								$("#menu li.menu-item").removeClass("hover");
								$("#menu li.menu-item ul li").removeClass("hover");
								$(this).addClass("hover")
							} else {
								$(this).addClass("hover").siblings().removeClass("hover");
								$(this).parent().parent().addClass("menu-show")
							}
						}
					})
				}
				function setCookie(key, value) {
					document.cookie = key + "=" + value + "; path=/; expires=-1"
				}
				function getCookie(key) {
					var keyName = key + "=";
					var arr = document.cookie.split("; ");
					for (var i = 0; i < arr.length; i++) {
						var cookieName = arr[i].trim();
						if (cookieName.indexOf(keyName) == 0) {
							return cookieName.substring(keyName.length, cookieName.length)
						}
					}
					return ""
				}
				function delCookie(key) {
					var exp = new Date();
					exp.setTime(exp.getTime() - 1);
					var cval = getCookie(key);
					if (cval != null) {
						document.cookie = key + "=" + cval + ";expires=" + exp.toGMTString()
					}
				}
			},
			tab: function(args) {
				var opt = defaults(args);
				var tabId = opt.id;
				var current = opt.current;
				var mode = opt.mode;
				var display = opt.display;
				$("#" + tabId + " .tab-title ul li").each(function(i) {
					if (i == (current - 1)) {
						$(this).addClass("current")
					}
				});
				$("#" + tabId + " .tab-content>div").each(function(i) {
					if (i == (current - 1)) {
						$(this).css("display", display)
					} else {
						$(this).css("display", "none")
					}
				});
				opt.callback({
					"index": current
				});
				if (mode == "mouseover") {
					$("#" + tabId + " .tab-title ul li").mouseover(function() {
						$this = $(this);
						setTimeout(function() {
							$this.addClass("current").siblings().removeClass("current");
							$("#" + tabId + " .tab-content>div:eq(" + $this.index() + ")").show().siblings().hide();
							opt.callback({
								"index": $this.index() + 1
							})
						},
						opt.delay)
					})
				} else if (mode == "click") {
					$("#" + tabId + " .tab-title ul li").click(function() {
						$(this).addClass("current").siblings().removeClass("current");
						$("#" + tabId + " .tab-content>div:eq(" + $(this).index() + ")").show().siblings().hide();
						opt.callback({
							"index": $(this).index() + 1
						})
					})
				}
			},
			table: function(args) {
				var opt = defaults(args);
				var tableId = opt.id;
				var mergeColArr = opt.mergeColArr;
				var tree = opt.tree;
				if (mergeColArr.length > 0) {
					for (var i = 0; i < mergeColArr.length; i++) {
						tableMerge($("#" + tableId), mergeColArr[i] - 1)
					}
					$("#" + tableId).removeData()
				}
				if (parseInt(tree) > 0) {
					$("#" + tableId + " tbody tr").each(function() {
						setPaddingLeft($(this))
					});
					$("#" + tableId + " .icon-caret-down, #" + tableId + " icon-caret-right").on("click",
					function(e) {
						if ($(this).hasClass("icon-caret-down")) {
							$(this).addClass("icon-caret-right").removeClass("icon-caret-down")
						} else {
							$(this).addClass("icon-caret-down").removeClass("icon-caret-right")
						}
						var flag = false;
						var objTr = $(this).parents("tr");
						objTr.nextAll("tr").each(function() {
							var parentId = $(this).attr("parentId");
							if (parentId == objTr.attr("id")) {
								if ($(this).is(":hidden")) {
									flag = true;
									$(this).show()
								}
							}
						});
						if (!flag) {
							hideTr(objTr)
						}
						e.stopPropagation()
					})
				}
				function setPaddingLeft(objTr) {
					var flag = false;
					var id = objTr.attr("id");
					objTr.nextAll("tr").each(function() {
						if ($(this).attr("parentId") == id) {
							flag = true;
							if (objTr.children("td:eq(" + (tree - 1) + ")").children("span.icon-caret-down").length == 0) {
								objTr.children("td:eq(" + (tree - 1) + ")").prepend('<span class="tree-icon icon-caret-down" style="font-size: 16px;"></span>')
							}
							var paddingLeft = parseInt($(this).children("td:eq(" + (tree - 1) + ")").css("padding-left"));
							$(this).children("td:eq(" + (tree - 1) + ")").css("padding-left", (paddingLeft + 16) + "px");
							setPaddingLeft($(this))
						}
					});
					if (!flag) {
						var objTd = objTr.children("td:eq(" + (tree - 1) + ")");
						objTd.children("span.icon-caret-down").remove();
						objTr.prevAll().each(function() {
							if ($(this).children("td:eq(" + (tree - 1) + ")").children("span.icon-caret-down").length > 0) {
								var paddingLeft = parseInt($(this).children("td:eq(" + (tree - 1) + ")").css("padding-left"));
								objTd.css("padding-left", (paddingLeft + 40) + "px");
								return false
							}
						})
					}
				}
				function hideTr(objTr) {
					var id = objTr.attr("id");
					objTr.nextAll("tr").each(function() {
						if ($(this).attr("parentId") == id) {
							if ($(this).children("td:eq(" + (tree - 1) + ")").children("span.icon-caret-down").length > 0) {
								$(this).children("td:eq(" + (tree - 1) + ")").children("span.icon-caret-down").addClass("icon-caret-right").removeClass("icon-caret-down")
							}
							$(this).hide();
							hideTr($(this))
						}
					})
				}
				function tableMerge(obj, colIndex) {
					obj.data("content", "");
					obj.data("rowspan", 1);
					obj.data("td", $());
					obj.data("trNum", $("#" + tableId + " tbody tr", obj).length);
					$("tbody tr", obj).each(function(index) {
						var $tr = $(this);
						var $td = $("td:eq(" + colIndex + ")", $tr);
						var currentContent = $td.html();
						if (obj.data("content") == "") {
							obj.data("content", currentContent);
							obj.data("td", $td)
						} else {
							if (obj.data("content") == currentContent) {
								addRowspan()
							} else {
								newRowspan()
							}
						}
						function addRowspan() {
							var rowspan = obj.data("rowspan") + 1;
							obj.data("rowspan", rowspan);
							$td.hide();
							if (++index == obj.data("trNum")) {
								obj.data("td").attr("rowspan", obj.data("rowspan"))
							}
						}
						function newRowspan() {
							if (obj.data("rowspan") != 1) {
								obj.data("td").attr("rowspan", obj.data("rowspan"))
							}
							obj.data("td", $td);
							obj.data("content", $td.html());
							obj.data("rowspan", 1)
						}
					})
				}
			},
			select: function(args) {
				var opt = defaults(args);
				var selectId = opt.id;
				$("#span-" + selectId).remove();
				$("#" + selectId).css("display", "none");
				var selectHtml = '<span id="span-' + selectId + '" style="position: relative;">';
				if (opt.isSearch) {
					selectHtml += '<input id="input-' + selectId + '" name="input-' + selectId + '" type="text" class="select" oninput="javaex.selectSearch(\'' + selectId + '\', this.value)" />'
				} else {
					selectHtml += '<input id="input-' + selectId + '" name="input-' + selectId + '" type="text" class="select" readonly />'
				}
				selectHtml += '<span id="icon-' + selectId + '" class="icon-expand_more"></span>';
				selectHtml += '<ul id="ul-' + selectId + '" class="select-ul">';
				selectHtml += '</ul>';
				selectHtml += '</span>';
				$("#" + selectId).before(selectHtml);
				if ($("#" + selectId).prop("disabled")) {
					$("#input-" + selectId).addClass("disabled")
				}
				$("#icon-" + selectId).css({
					"position": "absolute",
					"right": "6px",
					"font-size": "20px",
					"color": "#999",
					"top": "0"
				});
				var zoom = $("#" + selectId).attr("zoom");
				if (zoom != null) {
					$("#span-" + selectId).css("zoom", zoom)
				}
				var width = $("#" + selectId).width();
				if (width < 140) {
					width = 140
				}
				$("#input-" + selectId).css("width", width + "px");
				$("#ul-" + selectId).empty();
				$("#ul-" + selectId).html($("#" + selectId).html());
				$("#ul-" + selectId + " option").addClass("select-ul-item");
				$("#ul-" + selectId + " option").each(function() {
					if ($(this).val() == $("#" + selectId).val()) {
						$(this).addClass("select-ul-item-selected");
						$("#input-" + selectId).val($(this).text());
						return false
					}
				});
				$("#ul-" + selectId).css("max-height", 28 * parseInt(opt.maxNum) + 2 + "px");
				$("#span-" + selectId).click(function(event) {
					if ($("#" + selectId).prop("disabled")) {
						event.preventDefault()
					} else {
						$("#ul-" + selectId + " option").removeClass("select-ul-item-selected");
						$("#ul-" + selectId + " option").each(function() {
							if ($(this).val() == $("#" + selectId).val()) {
								$(this).addClass("select-ul-item-selected");
								return false
							}
						});
						$("#ul-" + selectId + " option").css("display", "block");
						$(this).find("ul").css({
							"width": $(this).find("input").width() + 22,
							"display": "block"
						});
						event.stopPropagation()
					}
				});
				$("#ul-" + selectId + " option").on("click",
				function(event) {
					var selectValue = $(this).val();
					var selectName = $(this).text();
					$("#" + selectId).val(selectValue);
					$("#input-" + selectId).val($(this).text());
					$("#ul-" + selectId).css("display", "none");
					opt.callback({
						"selectValue": selectValue,
						"selectName": selectName
					});
					if ( !! $("#" + selectId).attr("onchange")) {
						$("#" + selectId).trigger("change")
					}
					event.stopPropagation()
				});
				$(document).click(function() {
					$("#ul-" + selectId).css("display", "none")
				})
			},
			selectSearch: function(selectId, keyword) {
				var count = 0;
				keyword = keyword.replace(/(^\s*)|(\s*$)/g, "");
				if (keyword == "") {
					$("#ul-" + selectId + " option").show()
				} else {
					$("#ul-" + selectId + " option").each(function(i) {
						if ($(this).text().toLowerCase().indexOf(keyword.toLowerCase()) == -1) {
							$(this).css("display", "none");
							count++
						} else {
							$(this).css("display", "block")
						}
					})
				}
			},
			page: function(args) {
				var opt = defaults(args);
				var pageId = opt.id;
				var pageCount = opt.pageCount;
				if (pageCount == null) {
					return false
				}
				pageCount = parseInt(pageCount);
				var currentPage = parseInt(opt.currentPage);
				if (currentPage < 1 || currentPage > pageCount) {
					currentPage = 1
				}
				var position = opt.position;
				if (position == "left") {
					$("#" + pageId).parent().css("text-align", "left")
				} else if (position == "center") {
					$("#" + pageId).parent().css("text-align", "center")
				} else if (position == "right") {
					$("#" + pageId).parent().css("text-align", "right")
				}
				if (pageCount <= 1) {
					$("#" + pageId).append('');
					return
				} else if (pageCount < 7) {
					var html = '<li><a>上一页</a></li>';
					for (var i = 1; i <= pageCount; i++) {
						if (i == currentPage) {
							html += '<li class="active" page="' + i + '"><a>' + i + '</a></li>'
						} else {
							html += '<li page="' + i + '"><a>' + i + '</a></li>'
						}
					}
					html += '<li><a>下一页</a></li>';
					$("#" + pageId).append(html);
					init(pageId)
				} else {
					newPages(pageId, "jump", currentPage)
				}
				function init(pageId) {
					$("#" + pageId).children("li").click(function() {
						var element = $(this);
						var pageText = $(this).children("a").text();
						var currentPage = "";
						var lastPage = $("#" + pageId).children("li.active").attr("page");
						if (isNaN(pageText)) {
							switch (pageText) {
							case "上一页":
								if (lastPage == "1") {
									return
								}
								if (lastPage >= (pageCount - 1) || lastPage <= 3 || pageCount < 7) {
									element = $("#" + pageId).children("li.active").prev()
								} else {
									newPages(pageId, "prev", (parseInt(lastPage) - 1));
									element = $("#" + pageId).children("li.active")
								}
								break;
							case "下一页":
								if (lastPage == pageCount) {
									return
								}
								if (lastPage >= (pageCount - 2) || lastPage < 3 || pageCount < 7) {
									element = $("#" + pageId).children("li.active").next()
								} else {
									newPages(pageId, "next", (parseInt(lastPage) + 1));
									element = $("#" + pageId).children("li.active")
								}
								break;
							case "...":
								return
							}
						} else {
							if (pageCount > 6) {
								if (pageText <= 3 || pageText >= (pageCount - 3)) {
									newPages(pageId, "jump", pageText)
								}
							}
						}
						currentPage = activePage(pageId, element);
						if (currentPage != "" && currentPage != lastPage) {
							opt.callback({
								"pageNum": currentPage
							})
						}
					})
				}
				function activePage(pageId, element) {
					element.addClass("active").siblings().removeClass("active");
					return $("#" + pageId).children("li.active").text()
				}
				function newPages(pageId, type, i) {
					var htmlLeft = "";
					var htmlRight = "";
					var htmlC = "";
					var HL = '<li><a>...</a></li>';
					var html = '<li><a>上一页</a></li>';
					for (var n = 0; n < 3; n++) {
						htmlC += '<li ' + ((n - 1) == 0 ? 'class="active"': '') + ' page="' + (i + n - 1) + '"><a>' + (i + n - 1) + '</a></li>';
						htmlLeft += '<li ' + ((n + 2) == i ? 'class="active"': '') + ' page="' + (n + 2) + '"><a>' + (n + 2) + '</a></li>';
						htmlRight += '<li ' + ((pageCount + n - 3) == i ? 'class="active"': '') + ' page="' + (pageCount + n - 3) + '"><a>' + (pageCount + n - 3) + '</a></li>'
					}
					switch (type) {
					case "next":
						if (i <= 4) {
							html += '<li page="1"><a>1</a></li>' + htmlLeft + HL + '<li page="' + pageCount + '"><a>' + pageCount + '</a></li>'
						} else if (i >= (pageCount - 3)) {
							html += '<li page="1"><a>1</a></li>' + HL + htmlRight + '<li page="' + pageCount + '"><a>' + pageCount + '</a></li>'
						} else {
							html += '<li page="1"><a>1</a></li>' + HL + htmlC + HL + '<li page="' + pageCount + '"><a>' + pageCount + '</a></li>'
						}
						break;
					case "prev":
						if (i <= 4) {
							html += '<li page="1"><a>1</a></li>' + htmlLeft + HL + '<li page="' + pageCount + '"><a>' + pageCount + '</a></li>'
						} else if (i >= (pageCount - 3)) {
							html += '<li page="1"><a>1</a></li>' + HL + htmlRight + '<li page="' + pageCount + '"><a>' + pageCount + '</a></li>'
						} else {
							html += '<li page="1"><a>1</a></li>' + HL + htmlC + HL + '<li page="' + pageCount + '"><a>' + pageCount + '</a></li>'
						}
						break;
					case "jump":
						if (i <= 4) {
							if (i == 1) {
								html += '<li class="active" page="1"><a>1</a></li>' + htmlLeft + HL + '<li page="' + pageCount + '"><a>' + pageCount + '</a></li>'
							} else {
								html += '<li page="1"><a>1</a></li>' + htmlLeft + HL + '<li page="' + pageCount + '"><a>' + pageCount + '</a></li>'
							}
						} else if ((i >= pageCount - 3) && (pageCount >= 7)) {
							if (i == pageCount) {
								html += '<li page="1"><a>1</a></li>' + HL + htmlRight + '<li class="active" page="' + pageCount + '"><a>' + pageCount + '</a></li>'
							} else {
								html += '<li page="1"><a>1</a></li>' + HL + htmlRight + '<li page="' + pageCount + '"><a>' + pageCount + '</a></li>'
							}
						} else {
							html += '<li page="1"><a>1</a></li>' + HL + htmlC + HL + '<li page="' + pageCount + '"><a>' + pageCount + '</a></li>'
						}
					}
					html += '<li><a>下一页</a></li>';
					if (pageCount > 5 || pageCount < 3) {
						$("#" + pageId).empty();
						$("#" + pageId).append(html);
						init(pageId)
					}
				}
			},
			date: function(args) {
				var opt = defaults(args);
				var dateId = opt.id;
				var isClear = false;
				var initDate = "";
				var initHMS = "";
				var initStart = "";
				var initEnd = "";
				var hideMidDate = 0;
				var monthNum = Math.min(parseInt(opt.monthNum), 2);
				var isTime = opt.isTime;
				if (monthNum == 1 && (isTime || isTime == "true")) {
					if (opt.date.split(" ")[1] == undefined || opt.date.split(" ")[1] == "" || opt.date.split(" ")[1] == null) {
						opt.date = opt.date + " 00:00:00"
					}
				}
				var dateHtml = '<div id="date-box-' + dateId + '" class="date-main date-ui" style="display: none;">';
				dateHtml += '<div class="date-body date-ui" id="date-list-' + dateId + '">';
				dateHtml += '</div>';
				dateHtml += '<div class="date-foot date-ui">';
				dateHtml += '<div class="form-msg" style="display:none;">';
				dateHtml += '<input type="text" id="hide-start-' + dateId + '" value="' + opt.startDate + '" readonly />';
				dateHtml += '<span> - </span>';
				dateHtml += '<input type="text" id="hide-end-' + dateId + '" value="' + opt.endDate + '" readonly />';
				dateHtml += '<input type="text" id="hide-date-' + dateId + '" value="' + opt.date.split(" ")[0] + '" readonly />';
				if (monthNum == 1 && (isTime || isTime == "true")) {
					dateHtml += '<input type="text" id="hide-HMS-' + dateId + '" value="' + opt.date.split(" ")[1] + '" readonly />'
				}
				dateHtml += '</div>';
				dateHtml += '<div class="form-btn">';
				dateHtml += '<button class="button gray btn-left" id="date-clear-' + dateId + '">清空</button>';
				dateHtml += '<button class="button wathet btn-left" id="date-cancel-' + dateId + '">取消</button>';
				dateHtml += '<button class="button blue btn-right" id="date-ok-' + dateId + '">确定</button>';
				dateHtml += '</div>';
				dateHtml += '</div>';
				dateHtml += '</div>';
				$(document.body).append(dateHtml);
				init();
				close(true);
				$("#" + dateId).bind("click",
				function() {
					if (monthNum == 1) {
						initDate = document.getElementById("hide-date-" + dateId).value;
						if (isTime || isTime == "true") {
							initHMS = document.getElementById("hide-HMS-" + dateId).value
						}
					} else {
						initStart = document.getElementById("hide-start-" + dateId).value;
						initEnd = document.getElementById("hide-end-" + dateId).value;
						if (initStart != "" && initEnd != "") {
							var hideStartDate = str2date(initStart).getTime();
							var hideEndDate = str2date(initEnd).getTime();
							hideMidDate = hideStartDate + (hideEndDate - hideStartDate) / 2
						}
					}
					init();
					show();
					return
				});
				$("#date-ok-" + dateId).bind("click",
				function() {
					close(true);
					if (monthNum == 1 && (isTime || isTime == "true")) {
						var str = "";
						var date = $("#hide-date-" + dateId).val();
						if (date == "") {
							str = ""
						} else {
							str = date + " " + getHMStime()
						}
						opt.callback({
							"date": str
						})
					} else {
						opt.callback({
							"startDate": $("#hide-start-" + dateId).val(),
							"endDate": $("#hide-end-" + dateId).val(),
							"date": $("#hide-date-" + dateId).val()
						})
					}
					return
				});
				$("#date-cancel-" + dateId).bind("click",
				function() {
					if (monthNum == 1) {
						document.getElementById("hide-date-" + dateId).value = initDate;
						if (isTime || isTime == "true") {
							document.getElementById("hide-HMS-" + dateId).value = initHMS
						}
					} else {
						document.getElementById("hide-start-" + dateId).value = initStart;
						document.getElementById("hide-end-" + dateId).value = initEnd
					}
					close();
					isClear = false;
					return
				});
				$("#date-clear-" + dateId).bind("click",
				function() {
					var date = document.getElementById("hide-date-" + dateId).value;
					var start = document.getElementById("hide-start-" + dateId).value;
					var end = document.getElementById("hide-end-" + dateId).value;
					if (monthNum == 1) {
						document.getElementById("hide-date-" + dateId).value = "";
						if (isTime || isTime == "true") {
							document.getElementById("hide-HMS-" + dateId).value = "";
							$("#date-hour-" + dateId + " li").removeClass("current");
							$("#date-minute-" + dateId + " li").removeClass("current");
							$("#date-second-" + dateId + " li").removeClass("current")
						}
					} else {
						document.getElementById("hide-start-" + dateId).value = "";
						document.getElementById("hide-end-" + dateId).value = ""
					}
					removeCSS();
					isClear = true;
					return
				});
				function init() {
					var exDate = this;
					$("#date-list-" + dateId).empty();
					var endDate = "";
					if (opt.endDate == "") {
						if (opt.date == "") {
							endDate = new Date()
						} else {
							endDate = str2date(opt.date.split(" ")[0])
						}
					} else {
						endDate = str2date(opt.endDate)
					}
					this.calendarEndDate = new Date(endDate.getFullYear(), endDate.getMonth() + 1, 0);
					if (monthNum == 1 && (isTime || isTime == "true")) {
						for (var i = 0; i < monthNum; i++) {
							var td = "";
							td = fillDate(endDate.getFullYear(), endDate.getMonth(), i);
							if (0 == i) {
								$("#date-list-" + dateId).append(td)
							} else {
								var firstTd = $("#date-list-" + dateId).find("table").get(0);
								$(firstTd).before(td)
							}
							endDate.setMonth(endDate.getMonth() - 1, 1)
						}
						var timeHtml = '';
						timeHtml += '<table>';
						timeHtml += '<caption>时间选择</caption>';
						timeHtml += '<thead>';
						timeHtml += '<tr>';
						timeHtml += '<th>小时</th>';
						timeHtml += '<th>分钟</th>';
						timeHtml += '<th>秒数</th>';
						timeHtml += '</tr>';
						timeHtml += '</thead>';
						timeHtml += '<tbody>';
						timeHtml += '<tr>';
						var hourHtml = '';
						hourHtml += '<td style="padding: 0;">';
						hourHtml += '<ul id="date-hour-' + dateId + '" style="height: 180px; overflow: auto;">';
						for (var n = 0; n < 24; n++) {
							if (n < 10) {
								hourHtml += '<li>0' + n + '</li>'
							} else {
								hourHtml += '<li>' + n + '</li>'
							}
						}
						hourHtml += '</ul>';
						hourHtml += '</td>';
						timeHtml += hourHtml;
						var minuteHtml = '';
						minuteHtml += '<td style="padding: 0;">';
						minuteHtml += '<ul id="date-minute-' + dateId + '" style="height: 180px; overflow: auto;">';
						for (var n = 0; n < 60; n++) {
							if (n < 10) {
								minuteHtml += '<li>0' + n + '</li>'
							} else {
								minuteHtml += '<li>' + n + '</li>'
							}
						}
						minuteHtml += '</ul>';
						minuteHtml += '</td>';
						timeHtml += minuteHtml;
						var secondHtml = '';
						secondHtml += '<td style="padding: 0;">';
						secondHtml += '<ul id="date-second-' + dateId + '" style="height: 180px; overflow: auto;">';
						for (var n = 0; n < 60; n++) {
							if (n < 10) {
								secondHtml += '<li>0' + n + '</li>'
							} else {
								secondHtml += '<li>' + n + '</li>'
							}
						}
						secondHtml += '</ul>';
						secondHtml += '</td>';
						timeHtml += secondHtml;
						timeHtml += '</tr>';
						timeHtml += '</tbody>';
						timeHtml += '</table>';
						$("#date-list-" + dateId).append(timeHtml)
					} else {
						for (var i = 0; i < monthNum; i++) {
							var td = "";
							td = fillDate(endDate.getFullYear(), endDate.getMonth(), i);
							if (0 == i) {
								$("#date-list-" + dateId).append(td)
							} else {
								var firstTd = $("#date-list-" + dateId).find("table").get(0);
								$(firstTd).before(td)
							}
							endDate.setMonth(endDate.getMonth() - 1, 1)
						}
					}
					this.calendarStartDate = new Date(endDate.getFullYear(), endDate.getMonth() + 1, 1);
					$("#last-year-" + dateId).bind("click",
					function() {
						exDate.calendarEndDate.setFullYear(exDate.calendarEndDate.getFullYear() - 1, exDate.calendarEndDate.getMonth(), 1);
						opt.endDate = date2ymd(exDate.calendarEndDate).join("-");
						init();
						return
					});
					$("#last-month-" + dateId).bind("click",
					function() {
						exDate.calendarEndDate.setMonth(exDate.calendarEndDate.getMonth() - 1, 1);
						opt.endDate = date2ymd(exDate.calendarEndDate).join("-");
						init();
						return
					});
					$("#next-month-" + dateId).bind("click",
					function() {
						exDate.calendarEndDate.setMonth(exDate.calendarEndDate.getMonth() + 1, 1);
						opt.endDate = date2ymd(exDate.calendarEndDate).join("-");
						init();
						return
					});
					$("#next-year-" + dateId).bind("click",
					function() {
						exDate.calendarEndDate.setFullYear(exDate.calendarEndDate.getFullYear() + 1, exDate.calendarEndDate.getMonth(), 1);
						opt.endDate = date2ymd(exDate.calendarEndDate).join("-");
						init();
						return
					});
					$("#date-hour-" + dateId + " li").bind("click",
					function() {
						$(this).addClass("current").siblings().removeClass("current");
						setHMStime();
						return
					});
					$("#date-minute-" + dateId + " li").bind("click",
					function() {
						$(this).addClass("current").siblings().removeClass("current");
						setHMStime();
						return
					});
					$("#date-second-" + dateId + " li").bind("click",
					function() {
						$(this).addClass("current").siblings().removeClass("current");
						setHMStime();
						return
					});
					addCSS()
				}
				function setHMStime() {
					var hour = $("#date-hour-" + dateId + " li.current").text();
					var minute = $("#date-minute-" + dateId + " li.current").text();
					var second = $("#date-second-" + dateId + " li.current").text();
					$("#hide-HMS-" + dateId).val(hour + ":" + minute + ":" + second)
				}
				function removeCSS() {
					var csd = this.calendarStartDate;
					var ced = this.calendarEndDate;
					var bDate = new Date(csd.getFullYear(), csd.getMonth(), csd.getDate());
					var choice = "";
					for (var d = new Date(bDate); d.getTime() <= ced.getTime(); d.setDate(d.getDate() + 1)) {
						choice = "choice-style";
						$("#" + dateId + "_date_" + date2ymd(d).join("-")).removeClass(choice);
						$("#" + dateId + "_date_" + date2ymd(d).join("-")).removeClass("started").removeClass("ended").removeClass("selected")
					}
				}
				function addCSS() {
					if (monthNum == 1) {
						var date = str2date($("#hide-date-" + dateId).val());
						$("#" + dateId + "_date_" + date2ymd(new Date(date)).join("-")).removeClass().addClass("ended");
						if (isTime || isTime == "true") {
							var HMS = $("#hide-HMS-" + dateId).val();
							var arr = HMS.split(":");
							$("#date-hour-" + dateId + " li").each(function() {
								if ($(this).text() == arr[0]) {
									$(this).addClass("current").siblings().removeClass("current");
									return
								}
							});
							$("#date-minute-" + dateId + " li").each(function() {
								if ($(this).text() == arr[1]) {
									$(this).addClass("current").siblings().removeClass("current");
									return
								}
							});
							$("#date-second-" + dateId + " li").each(function() {
								if ($(this).text() == arr[2]) {
									$(this).addClass("current").siblings().removeClass("current");
									return
								}
							})
						}
						return
					}
					var startDate = str2date($("#hide-start-" + dateId).val());
					var endDate = str2date($("#hide-end-" + dateId).val());
					var choice = "";
					for (var d = new Date(startDate); d.getTime() <= endDate.getTime(); d.setDate(d.getDate() + 1)) {
						choice = "choice-style";
						$("#" + dateId + "_date_" + date2ymd(d).join("-")).removeClass("started").removeClass("ended").removeClass("selected");
						$("#" + dateId + "_date_" + date2ymd(d).join("-")).removeClass(choice);
						$("#" + dateId + "_date_" + date2ymd(d).join("-")).attr("class", choice)
					}
					$("#" + dateId + "_date_" + date2ymd(new Date(startDate)).join("-")).removeClass().addClass("started");
					$("#" + dateId + "_date_" + date2ymd(new Date(endDate)).join("-")).removeClass().addClass("ended")
				}
				function selectDate(ymd) {
					isClear = false;
					var ymdFormat = formatDate(ymd);
					if (this.dateInput == ("hide-date-" + dateId)) {
						removeCSS();
						$("#" + dateId + "_date_" + ymd).attr("class", "selected");
						$("#" + this.dateInput).val(ymdFormat);
						return
					}
					if ($("#" + this.dateInput).val() == "") {
						if (this.dateInput == ("hide-start-" + dateId)) {
							removeCSS();
							$("#" + dateId + "_date_" + ymd).attr("class", "selected");
							$("#" + this.dateInput).val(ymdFormat);
							this.dateInput = "hide-end-" + dateId
						} else if (this.dateInput == ("hide-end-" + dateId)) {
							if ($("#hide-start-" + dateId).val() == "") {
								this.dateInput = "hide-start-" + dateId;
								selectDate(ymd);
								return
							}
							$("#" + this.dateInput).val(ymdFormat);
							this.dateInput = "hide-start-" + dateId;
							var hideStartDate = str2date($("#hide-start-" + dateId).val()).getTime();
							var hideEndDate = str2date($("#hide-end-" + dateId).val()).getTime();
							if (hideEndDate < hideStartDate) {
								var tmp = $("#hide-start-" + dateId).val();
								$("#hide-start-" + dateId).val($("#hide-end-" + dateId).val());
								$("#hide-end-" + dateId).val(tmp)
							}
							removeCSS();
							addCSS()
						}
					} else {
						var nowClickDate = str2date(ymdFormat).getTime();
						if (nowClickDate < hideMidDate) {
							$("#hide-start-" + dateId).val(ymdFormat)
						} else {
							$("#hide-end-" + dateId).val(ymdFormat)
						}
						removeCSS();
						addCSS();
						var hideStartDate = str2date($("#hide-start-" + dateId).val()).getTime();
						var hideEndDate = str2date($("#hide-end-" + dateId).val()).getTime();
						hideMidDate = hideStartDate + (hideEndDate - hideStartDate) / 2
					}
				}
				function show() {
					var pos = $("#" + dateId).offset();
					var left = pos.left;
					if (opt.alignment == "right") {
						var width = $("#" + dateId).width();
						left = left + width - ($("#date-box-" + dateId).width() + 20)
					}
					$("#date-box-" + dateId).css("display", "block");
					$("#date-box-" + dateId).css("left", left + "px");
					$("#date-box-" + dateId).css("top", pos.top + $("#" + dateId).height() + 4 + "px");
					if (monthNum == 1) {
						this.dateInput = "hide-date-" + dateId;
						if (isTime || isTime == "true") {
							var diffH = $("#date-hour-" + dateId + " li.current").position().top;
							if (diffH > 220) {
								diffH = diffH - 83 + "px";
								$("#date-hour-" + dateId).animate({
									"scrollTop": diffH
								},
								500)
							}
							var diffM = $("#date-minute-" + dateId + " li.current").position().top;
							if (diffM > 220) {
								diffM = diffM - 83 + "px";
								$("#date-minute-" + dateId).animate({
									"scrollTop": diffM
								},
								500)
							}
							var diffS = $("#date-second-" + dateId + " li.current").position().top;
							if (diffS > 220) {
								diffS = diffS - 83 + "px";
								$("#date-second-" + dateId).animate({
									"scrollTop": diffS
								},
								500)
							}
						}
					} else {
						this.dateInput = "hide-start-" + dateId
					}
				}
				function close(isOk) {
					if (isOk) {
						var str = "";
						if (isClear) {
							if (monthNum == 1) {
								document.getElementById("hide-date-" + dateId).value = "";
								if (isTime || isTime == "true") {
									document.getElementById("hide-HMS-" + dateId).value = "";
									$("#date-hour-" + dateId + " li").removeClass("current");
									$("#date-minute-" + dateId + " li").removeClass("current");
									$("#date-second-" + dateId + " li").removeClass("current")
								}
							} else {
								document.getElementById("hide-start-" + dateId).value = "";
								document.getElementById("hide-end-" + dateId).value = ""
							}
						} else {
							if (monthNum == 1) {
								if (isTime || isTime == "true") {
									$("#" + dateId).val($("#hide-date-" + dateId).val() + " " + getHMStime())
								} else {
									$("#" + dateId).val($("#hide-date-" + dateId).val())
								}
							} else {
								if ($("#hide-end-" + dateId).val() == "") {
									$("#" + dateId).val($("#hide-start-" + dateId).val())
								} else {
									$("#" + dateId).val($("#hide-start-" + dateId).val() + opt.splitLine + $("#hide-end-" + dateId).val())
								}
							}
							if (monthNum == 1) {
								var date = $("#hide-date-" + dateId).val();
								if (isTime || isTime == "true") {
									if (date == "") {
										str = ""
									} else {
										str = date + " " + getHMStime()
									}
								} else {
									str = date
								}
							} else {
								if ($("#hide-end-" + dateId).val() == "") {
									$("#hide-end-" + dateId).val($("#hide-start-" + dateId).val())
								}
								str = $("#hide-start-" + dateId).val() + opt.splitLine + $("#hide-end-" + dateId).val();
								if (str == opt.splitLine) {
									str = ""
								}
							}
						}
						var obj = document.getElementById(dateId);
						if (obj && obj.tagName == "INPUT") {
							$("#" + dateId).val(str)
						} else {
							$("#" + dateId).html(str)
						}
						isClear = false
					}
					$("#date-box-" + dateId).css("display", "none")
				}
				function fillDate(year, month, index) {
					var exDate = this;
					var firstDayOfMonth = new Date(year, month, 1);
					var dateBegin = new Date(year, month, 1);
					var w = dateBegin.getDay();
					dateBegin.setDate(1 - w);
					var lastDayOfMonth = new Date(year, month + 1, 0);
					var dateEnd = new Date(year, month + 1, 0);
					w = dateEnd.getDay();
					dateEnd.setDate(dateEnd.getDate() + 6 - w);
					var today = new Date();
					var table = document.createElement("table");
					if (monthNum == 1 && (isTime || isTime == "true")) {
						$(table).css("position", "relative")
					}
					cap = document.createElement("caption");
					$(cap).append(year + "年" + (month + 1) + "月");
					$(table).append(cap);
					thead = document.createElement("thead");
					tr = document.createElement("tr");
					var days = ["日", "一", "二", "三", "四", "五", "六"];
					for (var i = 0; i < 7; i++) {
						th = document.createElement("th");
						$(th).append(days[i]);
						$(tr).append(th)
					}
					$(thead).append(tr);
					$(table).append(thead);
					tr = document.createElement("tr");
					td = document.createElement("td");
					if (index == 0) {
						if (monthNum == 1 && (isTime || isTime == "true")) {
							$(td).append('<a href="javascript:void(0);" id="next-month-' + dateId + '"><span class="icon-chevron-right" style="position: absolute;top: 10px;right: 22px;color: #555;font-size: 14px;"></span></a>');
							$(td).append('<a href="javascript:void(0);" id="next-year-' + dateId + '"><span class="icon-step-forward" style="position: absolute;top: 8px;right: 0;color: #555;font-size: 16px;"></span></a>')
						} else {
							$(td).append('<a href="javascript:void(0);" id="next-month-' + dateId + '"><span class="icon-chevron-right" style="position: absolute;top: 10px;right: 30px;color: #555;font-size: 14px;"></span></a>');
							$(td).append('<a href="javascript:void(0);" id="next-year-' + dateId + '"><span class="icon-step-forward" style="position: absolute;top: 8px;right: 10px;color: #555;font-size: 16px;"></span></a>')
						}
					}
					if ((index + 1) == monthNum) {
						if (monthNum == 1 && (isTime || isTime == "true")) {
							$(td).append('<a href="javascript:void(0);" id="last-year-' + dateId + '"><span class="icon-step-backward" style="position: absolute;top: 8px;left: 0;color: #555;font-size: 16px;"></span></a>');
							$(td).append('<a href="javascript:void(0);" id="last-month-' + dateId + '"><span class="icon-chevron-left" style="position: absolute;top: 10px;left: 22px;color: #555;font-size: 14px;"></span></a>')
						} else {
							$(td).append('<a href="javascript:void(0);" id="last-year-' + dateId + '"><span class="icon-step-backward" style="position: absolute;top: 8px;left: 10px;color: #555;font-size: 16px;"></span></a>');
							$(td).append('<a href="javascript:void(0);" id="last-month-' + dateId + '"><span class="icon-chevron-left" style="position: absolute;top: 10px;left: 30px;color: #555;font-size: 14px;"></span></a>')
						}
					}
					$(td).attr("colSpan", 7);
					$(td).css("text-align", "center");
					$(tr).append(td);
					var tbody = document.createElement("tbody");
					$(tbody).append(tr);
					var tdClass = "";
					var deviation = 0;
					var ymd = "";
					var maxDay = "";
					if (opt.maxDay == "today") {
						maxDay = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())
					} else {
						maxDay = str2date(opt.maxDay)
					}
					for (var d = dateBegin; d.getTime() <= dateEnd.getTime(); d.setDate(d.getDate() + 1)) {
						if (d.getTime() < firstDayOfMonth.getTime()) {
							tdClass = "dateRangeGray";
							deviation = -1
						} else if (d.getTime() > lastDayOfMonth.getTime()) {
							tdClass = "dateRangeGray";
							deviation = 1
						} else if (opt.maxDay != "" && d.getTime() > (maxDay.getTime())) {
							tdClass = "dateRangeGray";
							deviation = 2
						} else {
							deviation = 0;
							tdClass = ""
						}
						if (d.getDay() == 0) {
							tr = document.createElement("tr")
						}
						td = document.createElement("td");
						td.innerHTML = d.getDate();
						if (tdClass != "") {
							$(td).attr("class", tdClass)
						}
						if (deviation == 0) {
							ymd = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
							$(td).attr("id", dateId + "_date_" + ymd); (function(ymd) {
								$(td).bind("click", ymd,
								function() {
									selectDate(ymd);
									return
								})
							})(ymd)
						}
						$(td).addClass("riqi");
						$(tr).append(td);
						if (d.getDay() == 6) {
							$(tbody).append(tr)
						}
					}
					$(table).append(tbody);
					return table
				}
				function str2date(str) {
					var arr = str.split("-");
					return new Date(arr[0], arr[1] - 1, arr[2])
				}
				function date2ymd(date) {
					return [date.getFullYear(), (date.getMonth() + 1), date.getDate()]
				}
				function formatDate(ymd) {
					return ymd.replace(/(\d{4})\-(\d{1,2})\-(\d{1,2})/g,
					function(ymdFormatDate, y, m, d) {
						if (m < 10) {
							m = '0' + m
						}
						if (d < 10) {
							d = '0' + d
						}
						return y + "-" + m + "-" + d
					})
				}
				function getHMStime() {
					var hour = "";
					var minute = "";
					var second = "";
					if ($("#date-hour-" + dateId + " li.current").length > 0) {
						hour = $("#date-hour-" + dateId + " li.current").text()
					}
					if ($("#date-minute-" + dateId + " li.current").length > 0) {
						minute = $("#date-minute-" + dateId + " li.current").text()
					}
					if ($("#date-second-" + dateId + " li.current").length > 0) {
						second = $("#date-second-" + dateId + " li.current").text()
					}
					var time = "";
					if (hour != "" && minute != "" && second != "") {
						time = hour + ":" + minute + ":" + second
					}
					return time
				}
			},
			time: function(args) {
				var opt = defaults(args);
				var timeId = opt.id;
				var time = opt.time;
				var initHMS = "";
				var isClear = false;
				var timeHtml = '<div id="date-box-' + timeId + '" class="date-main date-ui" style="display: none;">';
				timeHtml += '<div class="date-body date-ui" id="date-list-' + timeId + '">';
				timeHtml += '<table class="tableTime" style="width:90%;">';
				timeHtml += '<caption>时间选择</caption>';
				timeHtml += '<thead>';
				timeHtml += '<tr>';
				timeHtml += '<th style="text-align: center;">小时</th>';
				timeHtml += '<th style="text-align: center;">分钟</th>';
				timeHtml += '<th style="text-align: center;">秒数</th>';
				timeHtml += '</tr>';
				timeHtml += '</thead>';
				timeHtml += '<tbody>';
				timeHtml += '<tr>';
				var hourHtml = '';
				hourHtml += '<td style="padding: 0;">';
				hourHtml += '<ul id="date-hour-' + timeId + '" style="height: 180px; overflow: auto;">';
				for (var n = 0; n < 24; n++) {
					if (n < 10) {
						hourHtml += '<li>0' + n + '</li>'
					} else {
						hourHtml += '<li>' + n + '</li>'
					}
				}
				hourHtml += '</ul>';
				hourHtml += '</td>';
				timeHtml += hourHtml;
				var minuteHtml = '';
				minuteHtml += '<td style="padding: 0;">';
				minuteHtml += '<ul id="date-minute-' + timeId + '" style="height: 180px; overflow: auto;">';
				for (var n = 0; n < 60; n++) {
					if (n < 10) {
						minuteHtml += '<li>0' + n + '</li>'
					} else {
						minuteHtml += '<li>' + n + '</li>'
					}
				}
				minuteHtml += '</ul>';
				minuteHtml += '</td>';
				timeHtml += minuteHtml;
				var secondHtml = '';
				secondHtml += '<td style="padding: 0;">';
				secondHtml += '<ul id="date-second-' + timeId + '" style="height: 180px; overflow: auto;">';
				for (var n = 0; n < 60; n++) {
					if (n < 10) {
						secondHtml += '<li>0' + n + '</li>'
					} else {
						secondHtml += '<li>' + n + '</li>'
					}
				}
				secondHtml += '</ul>';
				secondHtml += '</td>';
				timeHtml += secondHtml;
				timeHtml += '</tr>';
				timeHtml += '</tbody>';
				timeHtml += '</table>';
				timeHtml += '</div>';
				timeHtml += '<div class="date-foot date-ui" style="padding: 0;border-top: none;">';
				timeHtml += '<div class="form-msg" style="display:none;">';
				timeHtml += '<input type="text" id="hide-HMS-' + timeId + '" value="' + time + '" readonly />';
				timeHtml += '</div>';
				timeHtml += '<div class="form-btn">';
				timeHtml += '<button class="button gray btn-left" id="date-clear-' + timeId + '">清空</button>';
				timeHtml += '<button class="button wathet btn-left" id="date-cancel-' + timeId + '">取消</button>';
				timeHtml += '<button class="button blue btn-right" id="date-ok-' + timeId + '">确定</button>';
				timeHtml += '</div>';
				timeHtml += '</div>';
				timeHtml += '</div>';
				$(document.body).append(timeHtml);
				addCSS();
				show();
				close(true);
				$("#" + timeId).bind("click",
				function() {
					initHMS = document.getElementById("hide-HMS-" + timeId).value;
					addCSS();
					show();
					return
				});
				$("#date-ok-" + timeId).bind("click",
				function() {
					close(true);
					opt.callback({
						"time": getHMStime()
					});
					return
				});
				$("#date-cancel-" + timeId).bind("click",
				function() {
					document.getElementById("hide-HMS-" + timeId).value = initHMS;
					close();
					isClear = false;
					return
				});
				$("#date-clear-" + timeId).bind("click",
				function() {
					document.getElementById("hide-HMS-" + timeId).value = "";
					$("#date-hour-" + timeId + " li").removeClass("current");
					$("#date-minute-" + timeId + " li").removeClass("current");
					$("#date-second-" + timeId + " li").removeClass("current");
					isClear = true;
					return
				});
				$("#date-hour-" + timeId + " li").bind("click",
				function() {
					$(this).addClass("current").siblings().removeClass("current");
					setHMStime();
					return
				});
				$("#date-minute-" + timeId + " li").bind("click",
				function() {
					$(this).addClass("current").siblings().removeClass("current");
					setHMStime();
					return
				});
				$("#date-second-" + timeId + " li").bind("click",
				function() {
					$(this).addClass("current").siblings().removeClass("current");
					setHMStime();
					return
				});
				function addCSS() {
					var HMS = $("#hide-HMS-" + timeId).val();
					var arr = HMS.split(":");
					$("#date-hour-" + timeId + " li").each(function() {
						if ($(this).text() == arr[0]) {
							$(this).addClass("current").siblings().removeClass("current");
							return
						}
					});
					$("#date-minute-" + timeId + " li").each(function() {
						if ($(this).text() == arr[1]) {
							$(this).addClass("current").siblings().removeClass("current");
							return
						}
					});
					$("#date-second-" + timeId + " li").each(function() {
						if ($(this).text() == arr[2]) {
							$(this).addClass("current").siblings().removeClass("current");
							return
						}
					})
				}
				function getHMStime() {
					var hour = "";
					var minute = "";
					var second = "";
					if ($("#date-hour-" + timeId + " li.current").length > 0) {
						hour = $("#date-hour-" + timeId + " li.current").text()
					}
					if ($("#date-minute-" + timeId + " li.current").length > 0) {
						minute = $("#date-minute-" + timeId + " li.current").text()
					}
					if ($("#date-second-" + timeId + " li.current").length > 0) {
						second = $("#date-second-" + timeId + " li.current").text()
					}
					var time = "";
					if (hour != "" && minute != "" && second != "") {
						time = hour + ":" + minute + ":" + second
					}
					return time
				}
				function setHMStime() {
					var hour = $("#date-hour-" + timeId + " li.current").text();
					var minute = $("#date-minute-" + timeId + " li.current").text();
					var second = $("#date-second-" + timeId + " li.current").text();
					$("#hide-HMS-" + timeId).val(hour + ":" + minute + ":" + second)
				}
				function show() {
					var pos = $("#" + timeId).offset();
					var left = pos.left;
					$("#date-box-" + timeId).css("display", "block");
					$("#date-box-" + timeId).css("left", left + "px");
					$("#date-box-" + timeId).css("top", pos.top + $("#" + timeId).height() + 4 + "px");
					if ($("#date-hour-" + timeId + " li.current").length > 0) {
						var diffH = $("#date-hour-" + timeId + " li.current").position().top;
						if (diffH > 220) {
							diffH = diffH - 83 + "px";
							$("#date-hour-" + timeId).animate({
								"scrollTop": diffH
							},
							500)
						}
					}
					if ($("#date-minute-" + timeId + " li.current").length > 0) {
						var diffM = $("#date-minute-" + timeId + " li.current").position().top;
						if (diffM > 220) {
							diffM = diffM - 83 + "px";
							$("#date-minute-" + timeId).animate({
								"scrollTop": diffM
							},
							500)
						}
					}
					if ($("#date-second-" + timeId + " li.current").length > 0) {
						var diffS = $("#date-second-" + timeId + " li.current").position().top;
						if (diffS > 220) {
							diffS = diffS - 83 + "px";
							$("#date-second-" + timeId).animate({
								"scrollTop": diffS
							},
							500)
						}
					}
				}
				function close(isOk) {
					if (isOk) {
						var str = "";
						if (isClear) {
							document.getElementById("hide-HMS-" + timeId).value = "";
							$("#date-hour-" + timeId + " li").removeClass("current");
							$("#date-minute-" + timeId + " li").removeClass("current");
							$("#date-second-" + timeId + " li").removeClass("current")
						} else {
							$("#" + timeId).val(getHMStime());
							str = getHMStime()
						}
						var obj = document.getElementById(timeId);
						if (obj && obj.tagName == "INPUT") {
							$("#" + timeId).val(str)
						} else {
							$("#" + timeId).html(str)
						}
						isClear = false
					}
					$("#date-box-" + timeId).css("display", "none")
				}
			},
			upload: function(args) {
				var opt = defaults(args);
				var type = opt.type;
				var url = opt.url;
				var inputId = opt.id;
				var containerId = opt.containerId;
				var maxNum = opt.maxNum;
				var maxSize = opt.maxSize;
				var param = opt.param;
				var imgUrl = opt.imgUrl;
				var dataType = opt.dataType;
				if (type == "image") {
					$("#" + inputId).change(function() {
						var imageFile = $("#" + inputId)[0].files[0];
						if (!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(imageFile.name)) {
							info.optTip({
								content: "图片类型必须是.gif,jpeg,jpg,png中的一种",
								type: "error"
							});
							return false
						}
						if (maxSize == "" || maxSize == 0 || maxSize == "0") {} else {
							if (imageFile.size > (maxSize * 1024)) {
								info.optTip({
									content: "图片过大，单张图片上限 " + maxSize + "KB",
									type: "error"
								});
								return false
							}
						}
						if (dataType == "base64") {
							var reader = new FileReader();
							if (imageFile) {
								reader.onload = function(event) {
									var base64Img = event.target.result;
									opt.callback(base64Img)
								}
							}
							reader.readAsDataURL(imageFile)
						} else if (dataType == "url") {
							var data = new FormData();
							data.append(param, imageFile);
							info.optTip({
								content: "文件上传中，请稍候...",
								type: "submit"
							});
							$.ajax({
								url: url,
								type: "post",
								data: data,
								dataType: "json",
								cache: false,
								contentType: false,
								processData: false,
								success: function(rtn) {
									opt.callback(rtn)
								},
								error: function() {
									info.optTip({
										content: "上传失败，请稍后重试",
										type: "error"
									})
								}
							})
						}
					})
				} else if (type == "images") {
					if ( !! imgUrl) {
						var uuidArr = new Array();
						for (var i = 0; i < imgUrl.length; i++) {
							var UUID = info.generateID();
							uuidArr.push(UUID);
							var imgHtml = '<div id=' + UUID + ' class="upload-images-thumbnail" style="width:' + opt.width + 'px;height:' + opt.height + 'px;">';
							imgHtml += '<img src="' + imgUrl[i] + '" width="100%" />';
							imgHtml += '<div class="img-trash"><span class="icon-trash-o"></span></div>';
							imgHtml += '</div>';
							$("#" + containerId).append(imgHtml)
						}
						imgBindEvent(uuidArr)
					}
					$("#" + inputId).change(function() {
						if ($("#" + containerId + " img").length > (parseInt(maxNum) - 1)) {
							info.optTip({
								content: "最多上传" + maxNum + "张图片",
								type: "error"
							});
							return false
						}
						if (dataType == "base64") {
							var uuidArr = new Array();
							var count = 0;
							var fileLength = $("#" + inputId)[0].files.length;
							var nowNum = $("#" + containerId + " img").length;
							$.each($("#" + inputId)[0].files,
							function(i) {
								if ((nowNum + i) < parseInt(maxNum)) {
									var UUID = info.generateID();
									uuidArr.push(UUID);
									var imageFile = $("#" + inputId)[0].files[i];
									if (!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(imageFile.name)) {
										info.optTip({
											content: "图片类型必须是.gif,jpeg,jpg,png中的一种",
											type: "error"
										});
										return false
									}
									if (maxSize == "" || maxSize == 0 || maxSize == "0") {} else {
										if (imageFile.size > (maxSize * 1024)) {
											info.optTip({
												content: "图片过大，单张图片上限 " + maxSize + "KB",
												type: "error"
											});
											return false
										}
									}
									var reader = new FileReader();
									reader.onload = function(event) {
										var base64Img = event.target.result;
										var imgHtml = '<div id=' + UUID + ' class="upload-images-thumbnail" style="width:' + opt.width + 'px;height:' + opt.height + 'px;">';
										imgHtml += '<div class="img-trash"><span class="icon-trash-o"></span></div>';
										imgHtml += '<img src="' + base64Img + '" width="100%" />';
										imgHtml += '</div>';
										$("#" + containerId).append(imgHtml);
										imgBindEvent(uuidArr);
										count++;
										if ((count == fileLength) || (nowNum + i) == (parseInt(maxNum) - 1)) {
											var imgUrlArr = new Array();
											$("#" + containerId + " img").each(function() {
												imgUrlArr.push($(this).attr("src"))
											});
											opt.callback(imgUrlArr)
										}
									};
									reader.readAsDataURL(imageFile)
								}
							})
						}
					});
					function imgBindEvent(uuidArr) {
						for (var i = 0; i < uuidArr.length; i++) {
							$("#" + uuidArr[i]).on("mouseenter", {
								index: i
							},
							function(event) {
								var i = event.data.index;
								$("#" + uuidArr[i] + " .img-trash").stop().animate({
									height: "30px"
								})
							});
							$("#" + uuidArr[i]).on("mouseleave", {
								index: i
							},
							function(event) {
								var i = event.data.index;
								$("#" + uuidArr[i] + " .img-trash").stop().animate({
									height: 0
								})
							});
							$("#" + uuidArr[i] + " .img-trash span").on("click", {
								index: i
							},
							function(event) {
								var i = event.data.index;
								$("#" + uuidArr[i]).remove();
								var imgUrlArr = new Array();
								$("#" + containerId + " img").each(function() {
									imgUrlArr.push($(this).attr("src"))
								});
								opt.callback(imgUrlArr)
							})
						}
					}
				} else if (type == "file") {
					$("#" + inputId).change(function() {
						var imageFile = $("#" + inputId)[0].files[0];
						if (maxSize == "" || maxSize == 0 || maxSize == "0") {} else {
							if (imageFile.size > (maxSize * 1024 * 1024)) {
								info.optTip({
									content: "文件过大，单个文件上限 " + maxSize + "M",
									type: "error"
								});
								return false
							}
						}
						var data = new FormData();
						data.append(param, imageFile);
						info.optTip({
							content: "文件上传中，请稍候...",
							type: "submit"
						});
						$.ajax({
							url: url,
							type: "post",
							data: data,
							dataType: "json",
							cache: false,
							contentType: false,
							processData: false,
							success: function(rtn) {
								opt.callback(rtn)
							},
							error: function() {
								info.optTip({
									content: "上传失败，请稍后重试",
									type: "error"
								})
							}
						})
					})
				}
			},
			ratio: 1,
			dragAble: false,
			mouseX: 0,
			mouseY: 0,
			imgDivId: "",
			cutBox: "",
			moveBox: "",
			dataUrl: "",
			imgSrc: "",
			image: new Image(),
			uploadAvatar: function(obj, args) {
				var opt = defaults(args);
				info.imgDivId = opt.imgDivId;
				info.moveBox = opt.moveBox;
				info.cutBox = opt.cutBox;
				info.dataUrl = opt.dataUrl;
				var reader = new FileReader();
				var imageFile = obj.files[0];
				if (imageFile) {
					reader.onload = function(event) {
						info.imgSrc = event.target.result;
						info.image.src = info.imgSrc;
						info.image.onload = function() {
							$("#" + opt.moveBox).hide();
							info.setBackgroundImage();
							info.headPreview();
							$("#" + info.imgDivId).bind("mousewheel DOMMouseScroll", info.imageZoom);
							$("#" + info.imgDivId).bind("mousedown", info.mouseDown);
							$("#" + info.imgDivId).bind("mousemove", info.imageDrag);
							$(window).bind("mouseup", info.mouseUp);
							$("#narrow").on("click",
							function() {
								info.narrow()
							});
							$("#enlarge").on("click",
							function() {
								info.enlarge()
							})
						}
					}
				}
				reader.readAsDataURL(imageFile)
			},
			enlarge: function() {
				this.ratio = this.ratio * 1.1;
				info.setBackgroundImage()
			},
			narrow: function() {
				this.ratio = this.ratio * 0.9;
				info.setBackgroundImage()
			},
			setBackgroundImage: function() {
				var zoomImgWidth = parseInt(info.image.width) * info.ratio;
				var zoomImgHeight = parseInt(info.image.height) * info.ratio;
				var posX = ($("#" + info.imgDivId).width() - zoomImgWidth) / 2;
				var posY = ($("#" + info.imgDivId).height() - zoomImgHeight) / 2;
				$("#" + info.imgDivId).css({
					"background-image": "url(" + info.image.src + ")",
					"background-repeat": "no-repeat",
					"background-size": zoomImgWidth + "px " + zoomImgHeight + "px",
					"background-position": posX + "px " + posY + "px"
				})
			},
			imageZoom: function(event) {
				if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
					info.ratio = info.ratio * 1.1
				} else {
					info.ratio = info.ratio * 0.9
				}
				info.setBackgroundImage();
				info.headPreview();
				event.preventDefault()
			},
			mouseDown: function(event) {
				event.stopImmediatePropagation();
				info.dragAble = true;
				info.mouseX = event.clientX;
				info.mouseY = event.clientY
			},
			imageDrag: function(event) {
				event.stopImmediatePropagation();
				if (info.dragAble) {
					var diffX = event.clientX - info.mouseX;
					var diffY = event.clientY - info.mouseY;
					var arr = $("#" + info.imgDivId).css("background-position").split(" ");
					var posX = diffX + parseInt(arr[0]);
					var posY = diffY + parseInt(arr[1]);
					$("#" + info.imgDivId).css("background-position", posX + "px " + posY + "px");
					info.mouseX = event.clientX;
					info.mouseY = event.clientY
				}
			},
			mouseUp: function(event) {
				event.stopImmediatePropagation();
				info.dragAble = false;
				info.headPreview()
			},
			headPreview: function() {
				var cutBoxWidth = $("#" + info.cutBox).width();
				var cutBoxHeight = $("#" + info.cutBox).height();
				var canvas = document.createElement("canvas");
				var posArr = $("#" + info.imgDivId).css("background-position").split(" ");
				var sizeArr = $("#" + info.imgDivId).css("background-size").split(" ");
				var swidth = parseInt(info.image.width);
				var sheight = parseInt(info.image.height);
				var x = parseInt(posArr[0]) - $("#" + info.imgDivId).width() / 2 + cutBoxWidth / 2;
				var y = parseInt(posArr[1]) - $("#" + info.imgDivId).height() / 2 + cutBoxHeight / 2;
				var width = parseInt(sizeArr[0]);
				var height = parseInt(sizeArr[1]);
				canvas.width = cutBoxWidth;
				canvas.height = cutBoxHeight;
				var context = canvas.getContext("2d");
				context.drawImage(info.image, 0, 0, swidth, sheight, x, y, width, height);
				var avatarPreviewImageSrc = canvas.toDataURL('image/png');
				$(".avatar180").html('');
				$(".avatar50").html('');
				$(".avatar30").html('');
				$(".avatar180").append('<img src="' + avatarPreviewImageSrc + '" align="absmiddle" style="width:180px;border-radius:180px;">');
				$(".avatar50").append('<img src="' + avatarPreviewImageSrc + '" align="absmiddle" style="width:50px;border-radius:50px;">');
				$(".avatar30").append('<img src="' + avatarPreviewImageSrc + '" align="absmiddle" style="width:30px;border-radius:30px;">');
				$("#" + info.dataUrl).val(avatarPreviewImageSrc)
			},
			edit: function(args) {
				var opt = defaults(args);
				var editId = opt.id;
				var content = opt.content;
				var curRange = "";
				var UUID = info.generateID();
				var editHtml = '';
				editHtml += '<div class="edit-toolbar">';
				editHtml += '<div class="edit-btn-toolbar">';
				editHtml += '<a class="edit-btn edit-btn-fullscreen" tip="全屏">';
				editHtml += '<div class="edit-icon-fullscreen edit-icon"></div>';
				editHtml += '</a>';
				editHtml += '<a class="edit-btn edit-btn-image" tip="本地图片">';
				editHtml += '<div class="edit-icon">';
				editHtml += '<label for="' + UUID + '" style="display: inline-block; width:100%;height:100%;">';
				editHtml += '</label>';
				editHtml += '</div>';
				editHtml += '<input type="file" style="display:none;" id="' + UUID + '" accept="image/gif, image/jpeg, image/jpg, image/png" />';
				editHtml += '</a>';
				editHtml += '<a class="edit-btn edit-btn-bold" tip="加粗"><div class="edit-icon"></div></a>';
				editHtml += '<a class="edit-btn edit-btn-italic" tip="斜体"><div class="edit-icon"></div></a>';
				editHtml += '<a class="edit-btn edui-btn-justifyleft" tip="居左对齐"><div class="edit-icon"></div></a>';
				editHtml += '<a class="edit-btn edui-btn-justifycenter" tip="居中对齐"><div class="edit-icon"></div></a>';
				editHtml += '<a class="edit-btn edui-btn-justifyright" tip="居右对齐"><div class="edit-icon"></div></a>';
				editHtml += '<select id="javaex-edit-family">';
				editHtml += '<option value="微软雅黑" selected>微软雅黑</option>';
				editHtml += '<option value="宋体">宋体</option>';
				editHtml += '<option value="幼圆">幼圆</option>';
				editHtml += '<option value="楷体">楷体</option>';
				editHtml += '</select>';
				editHtml += '<select id="javaex-edit-size">';
				editHtml += '<option value="3" selected>12</option>';
				editHtml += '<option value="4">16</option>';
				editHtml += '<option value="5">18</option>';
				editHtml += '<option value="6">25</option>';
				editHtml += '<option value="7">36</option>';
				editHtml += '</select>';
				editHtml += '<a class="edit-btn edui-btn-code" tip="代码"><div class="edit-icon"></div></a>';
				editHtml += '</div>';
				editHtml += '</div>';
				editHtml += '<div class="edit-editor-body">';
				editHtml += '<div class="edit-body-container" contenteditable="true">';
				if (content == "") {
					editHtml += '<p><br /></p>'
				} else {
					editHtml += '<p>' + content + '</p>'
				}
				editHtml += '</div>';
				editHtml += '</div>';
				$("#" + editId).append(editHtml);
				info.tip();
				$("#" + editId + " .edit-body-container").bind("mouseup keyup",
				function() {
					saveCurRange();
					opt.callback({
						"html": $("#" + editId + " .edit-body-container").html().replace(/<(script)[\S\s]*?\1>/gi, ""),
						"text": $("#" + editId + " .edit-body-container").text().replace(/<(script)[\S\s]*?\1>|<\/?(a|img)[^>]*>/gi, "")
					})
				});
				var image = opt.image;
				if (image == null || image.dataType == "base64") {
					info.upload({
						type: "image",
						id: UUID,
						dataType: "base64",
						callback: function(rtn) {
							restoreSelection();
							execCommand("insertimage", false, rtn)
						}
					})
				} else {
					info.upload({
						type: "image",
						url: image.url,
						id: UUID,
						param: image.param,
						dataType: "url",
						callback: function(rtn) {
							restoreSelection();
							image.rtnData = rtn;
							if (image.prefix == "undefined" || image.prefix == undefined) {
								execCommand("insertimage", false, image.rtnData.data.imgUrl)
							} else {
								execCommand("insertimage", false, image.prefix + image.rtnData.data.imgUrl)
							}
						}
					})
				}
				var isBold = false;
				$("#" + editId + " .edit-btn-bold").bind("click",
				function() {
					restoreSelection();
					execCommand("bold", false, null);
					if (isBold) {
						isBold = false;
						$(this).removeClass("edit-active")
					} else {
						isBold = true;
						$(this).addClass("edit-active")
					}
					return false
				});
				var isItalic = false;
				$("#" + editId + " .edit-btn-italic").bind("click",
				function() {
					restoreSelection();
					execCommand("italic", false, null);
					if (isItalic) {
						isItalic = false;
						$(this).removeClass("edit-active")
					} else {
						isItalic = true;
						$(this).addClass("edit-active")
					}
					return false
				});
				$("#" + editId + " .edui-btn-justifyleft").bind("click",
				function() {
					execCommand("justifyleft", false, null);
					return false
				});
				$("#" + editId + " .edui-btn-justifycenter").bind("click",
				function() {
					execCommand("justifycenter", false, null);
					return false
				});
				$("#" + editId + " .edui-btn-justifyright").bind("click",
				function() {
					execCommand("justifyright", false, null);
					return false
				});
				$("#javaex-edit-family").bind("change",
				function() {
					execCommand("fontName", false, $("#javaex-edit-family").val())
				});
				$("#javaex-edit-size").bind("change",
				function() {
					execCommand("fontSize", false, $("#javaex-edit-size").val())
				});
				var functionHtml = '';
				functionHtml += 'function editCode() {';
				functionHtml += 'var code = $("#javaex-code").val();';
				functionHtml += 'code = code.replace(/</g, "&lt;");';
				functionHtml += 'code = code.replace(/>/g, "&gt;");';
				functionHtml += 'code = code.replace(/\\n/g, "<br/>");';
				functionHtml += 'var codeStyle = $(":radio[name=\'code\']:checked").val();';
				functionHtml += '$(".edit-body-container").append(\'<pre><code class="\'+codeStyle+\'">\'+code+\'</code></pre><p><br /></p><p><br /></p><p><br /></p>\');';
				functionHtml += '}';
				$(document.body).append('<script>' + functionHtml + '</script>');
				$("#" + editId + " .edui-btn-code").bind("click",
				function() {
					var html = '<textarea id="javaex-code" class="desc" style="height:200px;overflow: inherit;"></textarea>';
					info.alert({
						title: "请输入要插入的代码",
						content: html,
						width: "600",
						top: "20%",
						callback: 'editCode()'
					});
					return false
				});
				function getCurRange() {
					var selection = null;
					var range = null;
					var parentElement = null;
					var oEditArea = $("#" + editId + " .edit-body-container")[0];
					selection = window.document.getSelection();
					if (selection.getRangeAt && selection.rangeCount) {
						range = window.document.getSelection().getRangeAt(0);
						parentElement = range.commonAncestorContainer
					}
					if (parentElement && (parentElement.id == oEditArea.id || window.jQuery.contains(oEditArea, parentElement))) {
						return range
					}
				}
				function saveCurRange() {
					curRange = getCurRange()
				}
				function restoreSelection() {
					if (curRange) {
						var selection = null;
						selection = window.document.getSelection();
						selection.removeAllRanges();
						selection.addRange(curRange)
					}
				}
				function execCommand(command, mode, data) {
					document.execCommand(command, mode, data);
					opt.callback({
						"html": $("#" + editId + " .edit-body-container").html().replace(/<(script)[\S\s]*?\1>/gi, ""),
						"text": $("#" + editId + " .edit-body-container").text().replace(/<(script)[\S\s]*?\1>|<\/?(a|img)[^>]*>/gi, "")
					})
				}
			}
		};
		return info
	};
	window.javaex = javaex()
})();
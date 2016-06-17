var pageFirst, pageLast;
var pageCurrent=1;
var maxpage=168;
var display=1;
(function ($) {
	'use strict';
	/*
	使用方法：$(DOM).jPaginator(options)
			  不设立options即使用初始设置
	options 建立参考函数后方表格
	可以自行调整CSS参数满足ui需求
	*/
	$.jPaginator = function(el, options){
		var self = this;
		self.$container = $(el);
		self.pageCurrent=1;
		self.pageFirst = 1; 
		self.pageLast = 3;

		self.init = function(){
			//初始化属性值
			if (options){
				self.option = options;
			}
			self.option = $.extend({},self.option, $.jPaginator.defaultOptions );
			self.htmlInit();
			self.setClick();
			self.setPPClick();
		}
		self.htmlInit = function(){
			/*初始化html
				.pgprev: < 
				.pgnexg: >
				.pgfh: ... (page front hide)
				.pglh: ... (page last hide)
				.pgfirst: first
				.pglast: last
				.pgcontainer: 包含页数标签
			*/
			self.$container.append("<span class='pgprev' style='display: none'><</span>");
			self.$container.append("<span class='pgfirst' style='display: none'>1</span>");
			self.$container.append("<span class='pgfh' style='display: none'>...</span>");
			self.$container.append("<div class='pgcontainer'>");
			self.$paginator = $(".pgcontainer");
			for (var i = self.pageFirst; i<=self.pageLast ; i++){
				self.$paginator.append("<span class='pgpaper'" +' pgindex= '+i+' >'+i+"</span>");
			}
			//self.$container.append("</div>");
			self.$container.append("<span class='pglh'>...</span>");
			self.$container.append("<span class='pglast' style='display: none'>"+maxpage+"</span>");
			self.$container.append("<span class='pgnext' style='display: none'> > </span>");
		};
		self.render=function(){
			//根据 pageCurrent 以及 设置进行渲染
			self.$paginator.children().remove();
			self.pageFirst = self.pageCurrent - self.option.display;
			if (self.pageFirst < 1) self.pageFirst=1;
			self.pageLast = self.pageFirst + self.option.display*2;
			if (self.pageLast > maxpage) {
				self.pageLast = maxpage;
				self.pageFirst = self.option.maxpage-self.option.display*2;
			}

			if (self.pageLast > self.option.maxpage) self.pageLast=self.option.maxpage;
			for (var i = self.pageFirst; i<=self.pageLast ; i++){
				self.$paginator.append("<span class='pgpaper'" +' pgindex= '+i+' >'+i+"</span>");
			}
			if (self.option.display!=1){
				if (this.pageFirst>1){
					self.$container.find(".pgfirst").css("display","inline-block");
				} else{
					self.$container.find(".pgfirst").css("display","none");
				}
				if (this.pageFirst>2){
					self.$container.find(".pgfh").css("display","inline-block");
				} else{
					self.$container.find(".pgfh").css("display","none");
				}
				if (this.pageLast<self.option.maxpage){
					self.$container.find(".pglast").css("display","inline-block");
				} else{
					self.$container.find(".pglast").css("display","none");
				}
				if (this.pageLast<(self.option.maxpage-1)){
					self.$container.find(".pglh").css("display","inline-block");
				} else{
					self.$container.find(".pglh").css("display","none");
				}
				}
			self.setPPClick();
		}
		self.setPPClick=function(){
			//绑定页数标签鼠标事件
			self.$paginator.find("span").click(function() {
				var pgindex = $(this).attr("pgindex");
				self.pageCurrent = parseInt(pgindex);
				self.render();
			});

		}
		self.setClick=function(){
			//绑定所有标签鼠标事件
			self.$container.find("span").click(function() {
				var pgclass = $(this).attr("class");
				switch(pgclass){
					case 'pglh':{
						$(".pgprev").css("display","inline-block");
						$(".pglast").css("display","inline-block");
						$(".pgnext").css("display","inline-block");
						self.option.display = 2;
						self.render();
						break;
					}
					case 'pgfh' :{
						break;
					}
					case 'pgfh' :{
						break;
					}
					case 'pgnext':{
						self.pageCurrent=parseInt(self.pageCurrent);
						self.pageCurrent++;
						self.render();
						break;
					}
					case 'pgprev':{
						self.pageCurrent=parseInt(self.pageCurrent);
						self.pageCurrent--;
						self.render();
						break;
					}
					case 'pgfirst':{
						self.pageCurrent=1;
						self.render();
						break;
					}
					case 'pglast':{
						self.pageCurrent = self.option.maxpage;
						self.render();
						break;
					}
					default: {
						break;
					}
				}
			});
		}
		self.init();

		return self.$container;
	}
	$.fn.jPaginator = function(){
		//支持$(DOM).jPaginator
		var self=this,
			args = Array.prototype.slice.call(arguments);
		return new $.jPaginator(this, args[0]);
	}
	$.jPaginator.defaultOptions = {
		/*初始设置：
			maxpage:最大页数
			display:每行显示数量/2
			pageCurrent:起始页数（暂不支持）
			clickCallBack:翻页执行函数（暂不支持）
		*/
		maxpage: 168,
		display: 1,
		pageCurrent: 1,
		clickCallBack: null,
	}
})(jQuery);

function paginate(){
	$(".pagination").jPaginator();
}




(function($){
	var Tab = function(tab){
		var _this = this;
		this.tab = tab;
		this.config = {
			"triggerType":'click',
			"effect":"default",
			"invoke":1,
			"auto":false
		}
		this.getConfig();
		if(this.getConfig()){
			$.extend(this.config,this.getConfig())
		}
		this.tabItems = this.tab.find(".tab-nav li");
		this.contentItems = this.tab.find(".content-wrap .content-item")
		var config = this.config;
		if(config.triggerType==="click"){
			this.tabItems.bind(config.triggerType,function(){
				console.log($(this));
				_this.invoke($(this));

			})


		}else if(config.triggerType==="mouseover"||config.triggerType!="click"){
			this.tabItems.bind(config.triggerType,function(){
				console.log($(this));
				_this.invoke($(this));
			})
		}
		//计数器
		if(config.auto){
			this.timer = null;
			this.loop = 0;
			this.autoPlay();
			this.tab.hover(function(){
				window.clearInterval(_this.timer);

			},function(){
				_this.autoPlay();

			})

		}
		if(config.invoke>1){
			this.invoke(this.tabItems.eq(config.invoke-1));
		}

	}
	Tab.prototype = {
		getConfig:function(){
			var config = this.tab.attr("data-config");
			// console.log(config);
			if(config&&config!=""){
				return $.parseJSON(config);
			}else{
				return null;
			}

		},
		invoke:function(currentTab){
			var _this = this;
			var index = currentTab.index();
			var effect = _this.config.effect
			console.log(currentTab);
			// console.log(currentTab.index());
			currentTab.addClass('actived').siblings().removeClass('actived');
			if(effect==="default"){
				_this.contentItems.eq(index).addClass("current").siblings().removeClass('current')
			}else if(effect==="fade"){
				_this.contentItems.eq(index).fadeIn(1000).siblings().fadeOut(1000)
			}
			if(_this.config.auto){
				_this.loop = index;
			}

		},
		autoPlay:function(){
			var _this = this,
			tabItems = this.tabItems,
			tabLength  = this.tabItems.size(),
			config = this.config;
			this.timer = window.setInterval(function(){

				_this.loop++;

				if(_this.loop >=tabLength){
					_this.loop = 0
				}
				   tabItems.eq(_this.loop).trigger(config.triggerType);
				_this.contentItems.eq(_this.loop).addClass("current").siblings().removeClass('current')
				console.log(_this.loop);

			},config.auto)

			




		}

	};
	//注册jq方法
	$.fn.extend({
		tab:function(){
			this.each(function(){
				new Tab($(this));
			})
			return this;
		}

	})

	window.Tab = Tab;

	

})(jQuery);
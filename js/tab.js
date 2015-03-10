jQuery(function($){
	var demoFun = {
		tabChange : function(param){
		/*
			param.eleWrap：标题容器，用于事件委托
			param.item：事件目标元素
			param.bodys：事件目标对应内容元素
			param.e: 事件类型(jQuery)
			param.tName：设置当前标题添加类名名称
			param.bName：设置当前内容添加类名名称
			param.pic：是否有图片懒加载
		*/
			var cfg = $.extend({
					e : 'click',
					tName : 'cur',
					bName : 'show',
					pic : false,
					weird : false,
					cur : 0,
					old : 0
				},param);
			//找不到绑定容器时，直接退出
			if(cfg.eleWrap.length <= 0){
				return false;
			}
			var	item = cfg.eleWrap.find(cfg.item),
				body = cfg.bodys;

			//如果标题和内容长度不够，或者不一样时
			if(item.length <= 0 || body.length <= 0 || item.length != body.length){
				return false;
			}

			//得到当前cur位置,防止当前显示不在第一条
			if(cfg.weird){
				item.each(function(index,ele){
					if($(ele).hasClass('cur')){
						cfg.old = $(ele).index();
						return false;
					}
				});
			};

			//执行事件绑定
			cfg.eleWrap.on(cfg.e, cfg.item,function(){
				var $this = $(this),
					idx = $this.index(),
					bb = null,
					img = null,
					src = '';

				//存在图片懒加载时，将图片src属性设置为V属性值
				if(cfg.cur != idx){
					bb = body.eq(idx);
					if(cfg.pic){
						img = bb.find('img');
						if(img.length < 0) return false;
						img.each(function(index,ele){
							src = $(ele).attr('v');
							if(src == undefined) return false;
							$(ele).attr('src',src);
							$(ele).removeAttr('v');
						});
					}
					cfg.cur = idx;
					item.eq(cfg.cur).addClass(cfg.tName);
					item.eq(cfg.old).removeClass(cfg.tName);
					body.eq(cfg.cur).addClass(cfg.bName);
					body.eq(cfg.old).removeClass(cfg.bName);
					cfg.old = cfg.cur;
				}
			});
		},
		init : function(){
			//执行选项卡
			demoFun.tabChange({eleWrap: $('.t1'), item : 'span', bodys : $('.item1'), weird : true, pic : true});
			//执行选项卡
			demoFun.tabChange({eleWrap: $('.t2'), item : 'span', bodys : $('.item2')});
		}
	}

	demoFun.init();
})
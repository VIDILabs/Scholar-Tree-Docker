var util = {    
    order_list: function(s, e){
		var gen_order = [];
		for(var c = 0; c < e; c++){
			gen_order.push(c);
		}
		return gen_order;
    },

    unique: function(itm, i, a){
		return i==a.indexOf(itm);
	},

    create_option: function(val, text, myclass, select){
        var option = $('<option></option>');
        option.attr("class", myclass).val(val).html(text).prop("selected", select);
        return option;
    },

    set_slider: function(researcher_period){
        $("#researcher_name").html(researcher_period[2]);
        DBLP_researcher = researcher_period[2];
        // ga('send', 'event', "researcher", "search", DBLP_researcher);
        
        var slider = $("#period_slider").data("ionRangeSlider");
        // Call sliders update method with any params
        slider.update({
            min: researcher_period[0], 
            max: researcher_period[1],
            from: researcher_period[0], 
            to: researcher_period[1],
            // type: 'double',
            // step: 1,
            // min_interval: 3
        });
        $("#detail").show();
        $("#progress").hide();
        $("#no_preview").show();
        $("#tree_result").hide();
        $("#draw_tree").removeAttr("disabled");
    },

    set_tree_img: function(img_id, img_src){
        var save_id = img_id + "_save";
        var cnt_id = img_id + "_cnt";
        
        $(img_id).attr('src', img_src);
        $(img_id).attr('href', img_src);
        $(img_id).css({'height': '100%'});
        
        var tree_width = $(img_id).width();
        var cnt_width = $(cnt_id).width();
        if (tree_width > cnt_width){
            $(img_id).css({'width': '100%'});
            $(img_id).height('auto');
            // $(img_id).css({'margin': '0'});
        }
        
        
        var pic_url = img_src.replace('image/png','image/octet-stream');
        var img_name = img_id.replace('#' , DBLP_researcher + "_");
        $(save_id).attr('download', img_name + ".png");
        $(save_id).attr('href', pic_url);

        $(save_id).click(function(){
            ga('send', 'event', DBLP_researcher, "save", sy + "-" + ey, this.name);
        });
        
        
        $(cnt_id).hover(function(){
            
        });

        $(cnt_id).unbind();
        $(cnt_id).click(function(){
            var show_snap = "#" + view_ego + "_cnt";
            var hide_snap = "#" + this.id.slice(0,5) + "_cnt";
            var hide_text = "#" + view_ego + "_text";
            var show_text = "#" + this.id.slice(0,5) + "_text";
            $(show_text).show();
            $(hide_text).hide();
            // $(show_snap).show();
            // $(hide_snap).hide();
            $(hide_snap).css({'border-width': '3px'});
            $(show_snap).css({'border-width': '1px'});

            view_ego = this.id.slice(0,5); 
            anim.static_img(view_ego);
            /*
            var img_src = tree_img_url[view_ego];
            $("#tree_display").attr('src', img_src);
            $("#tree_display").attr('href', img_src);
            $("#tree_display").css({'height': '100%'});

            var tree_width = $("#tree_display").width();
            var cnt_width = $("#tree_cnt").width();
            if (tree_width > cnt_width){
                $("#tree_display").css({'width': '100%'});
                $("#tree_display").height('auto');
            }
            */
            return false;
        });
        
    },

    set_anim_canvas: function(img_id){
        var anim_id = img_id + "_anim";
        var cnt_id = img_id + "_cnt";
        var pic_id = img_id + "_pic";

        var anim_cnt_h = $("#anim_container").height();
        var anim_cnt_w = $("#anim_container").height() * ($(img_id).width()/$(img_id).height());

        if (anim_cnt_w > $("#anim_container").width()){
            anim_cnt_w = $("#anim_container").width();
            anim_cnt_h = $("#anim_container").width() * ($(img_id).height()/$(img_id).width());
        }

        var snap_scale = 1;
        var snap_width = tree_boundary[img_id.slice(1, 6)][0];
        var snap_height = tree_boundary[img_id.slice(1, 6)][1];
        // var anim_cnt_w = $(window).width()-100;
        // var anim_cnt_h = $(window).height()-100;
        
        if(snap_width > anim_cnt_w || snap_height > anim_cnt_h){
            while(snap_width*snap_scale > anim_cnt_w || snap_height*snap_scale > anim_cnt_h){
                snap_scale = Math.round((snap_scale-0.001)*1000)/1000;
            }
        }
        else{
            snap_scale = 10;
            while(snap_width*snap_scale > anim_cnt_w || snap_height*snap_scale > anim_cnt_h){
                snap_scale = Math.round((snap_scale-0.001)*1000)/1000;
            }
        }

        tree_snap_scale[img_id.slice(1, 6)] = snap_scale;
        $(anim_id).click(function(){
            // $("#anim_tree").css({'width': anim_cnt_w});
            // $("#anim_tree").css({'height': anim_cnt_h});
            // $("#anim_container").show();
            // $("#tree_cnt").hide();
            // $("#anim_tree").center();
            anim.anim_render("tree"+this.name);
        });

        $(pic_id).click(function(){
            // clearInterval(timer);
            anim.static_img("tree"+this.name);;
        });
            

    }

};

jQuery.fn.center = function () {
    this.css("position","absolute");
    this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2)) + "px");
    this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2)) + "px");
    return this;
};

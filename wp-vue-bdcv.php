<?php
/**
 * Plugin Name: WordPress Vue Repositories
 * Description: A plugin for BDCV connection with institutional reposity.
 */
//Add shortscode

    function func_load_vuescripts() {
        $path = dirname(__FILE__);
        wp_register_script( 'wpvue_vuejs', 'https://cdn.jsdelivr.net/npm/vue/dist/vue.js');
        wp_register_script( 'wpvue_functions', 'https://cdnjs.cloudflare.com/ajax/libs/vue-router/3.1.3/vue-router.js');
        function func_wp_vue(){
            //Add Vue.js
            wp_enqueue_script('wpvue_vuejs');
            wp_enqueue_script('wpvue_functions');
            $path = dirname(__FILE__);
            $file = file_get_contents($path.'/index.php', true);
            return $file;
        }
    }

    add_action('wp_enqueue_scripts', 'func_load_vuescripts');
    add_shortcode( 'wpvue', 'func_wp_vue' );
    add_filter('widget_text', 'do_shortcode');
?>
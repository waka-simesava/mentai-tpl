'use strict'

const $ = jQuery = window.$ = window.jQuery = require('jquery')
import slick from 'slick-carousel'
import svgxuse from 'svgxuse'
import inview from 'jquery-inview'
import objectFitImages from 'object-fit-images'
objectFitImages()

require('./_lib/_ua').identification()
require('./_lib/_ua').checkDisplay()
require('./_lib/_toggle').toggle()
// require('./_lib/_toggle').mqToggle()
require('./_lib/_smoothScroll').smoothScroll()
require('./_lib/_pageTop').pageTop()
require('./_lib/_pageTop').scrollCat()
// require('./_lib/_externalLink').externalLink()
// require('./_lib/_scrollHeader').scrollHeader()
require('./_lib/_frontpage').carousel()
require('./_lib/_inview').inviewSetting()
require('./_lib/_loading').preloader()

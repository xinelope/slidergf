<?php
defined( '_JEXEC' ) or die( 'Restricted Access' );
$doc =& JFactory::getDocument();
$doc->addScript("".JURI::root()."modules/mod_slidergf/mod_slidergf.js");
$doc->addStyleSheet(JUri::root()."modules/mod_slidergf/css/mod_slidergf.css");
?>
<input type="hidden" id="test" value="">

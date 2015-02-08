// Create a select and append to #menu
var $select = $("<select></select>");
$("#menu").append($select);
// Cycle over menu links
$("#menu a").each(function(){
  var $anchor = $(this);
  // Create an option
  var $option = $("<option></option");
  // Deal with selected options depending on current page
  if($anchor.parent().hasClass("selected")) {
    $option.prop("selected", true);
  }
  // Options value is href
  $option.val($anchor.attr("href"))
  // Options text is the text of link
   $option.text($anchor.text());
  //append option to select
  $select.append($option);
});

// Bind change listener to the select
$select.change(function(){
  // Go to Selects location
  window.location = $select.val;
});

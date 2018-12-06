import $ from "jquery";
const CHECK_LIST_KEY = "check-list";

// navigator.serviceWorker.register("/assets/js/sw.js");

const createCheckList = $checkboxes => {
  return $checkboxes.map(function() {
    return $(this).prop("checked");
  });
};

const setChecked = ($checkboxes, checkedList) => {
  $checkboxes.each(function(index) {
    $(this).prop("checked", checkedList[index]);
  });
};

const getSavedCheckedList = () => {
  const checkListJson = localStorage.getItem(CHECK_LIST_KEY);
  if (checkListJson) {
    return JSON.parse(checkListJson);
  }

  return [];
};

const main = () => {
  const $checkboxes = $('input[type="checkbox"]');

  const checkedList = getSavedCheckedList();
  if (checkedList) {
    setChecked($checkboxes, checkedList);
  }

  $checkboxes.on("change", function() {
    const checkListJson = JSON.stringify(createCheckList($checkboxes));
    localStorage.setItem(CHECK_LIST_KEY, checkListJson);
  });
};

main();

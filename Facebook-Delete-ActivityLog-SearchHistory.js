function deleteFacebookActivityLog_SearchHistory(index = 0) {
  var errors = document.querySelectorAll('[aria-label="Close"]');
  if (errors.length >0) {
      var error = errors[0];
      error.scrollIntoView();
      error.click();
      setTimeout(() => {
        deleteFacebookActivityLog_SearchHistory(index + 1);
        console.log("Previous deletion failed");
      }, 250);
      return;
  }
  
  var items = document.querySelectorAll('[aria-label="Action options"] > i');
  var item = items[index]

  if (item) {
      console.log("ACTIVITY-LOG => ", item.parentNode.parentNode.parentNode.innerText);
          
      item.scrollIntoView();
      item.click();
      setTimeout(() => {
      var opts = document.querySelectorAll('[role="menuitem"]');
      var canDelete = false
      for (let i=0; i < opts.length; i += 1) {
          var opt = opts[i];
          if (opt.innerText === "Move to trash" || opt.innerText === "Delete" || opt.innerText === "Remove Tag") {
          var ariaLabel = opt.innerText === "Move to trash" ? "Move to Trash" : ( opt.innerText === "Delete" ? "Delete" : "Remove" );
          canDelete = true;
          opt.click();
          setTimeout(() => {
              var confirm = document.querySelector(`[aria-label="${ariaLabel}"][tabindex="0"]`);
              if (confirm) {
              confirm.click();
              }
              setTimeout(() => {
                deleteFacebookActivityLog_SearchHistory(index);
              console.log("Activity deleted");
              }, 2000);
          }, 250);
          break;
          }
          if (opt.innerText === "Unlike" || opt.innerText === "Remove Reaction") {
              canDelete = true;
              opt.click();
              setTimeout(() => {
                    deleteFacebookActivityLog_SearchHistory(index);
                    console.log("Reaction deleted");
                  }, 2000);
              break;
          }
      }
      if (!canDelete) {
          setTimeout(() => {
            deleteFacebookActivityLog_SearchHistory(index + 1);
          console.log("Nothing to do");
          }, 250);
      }
      }, 250);
  }
}

deleteFacebookActivityLog_SearchHistory();

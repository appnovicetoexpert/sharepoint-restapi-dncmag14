'use strict';

var SPHostUrl;
var SPAppWebUrl;

// read URL parameters
function retrieveQueryStringParameter(param) {
    var params = document.URL.split("?")[1].split("&");
    var strParams = "";
    for (var i = 0; i < params.length; i = i + 1) {
        var singleParam = params[i].split("=");
        if (singleParam[0] == param) {
            return singleParam[1];
        }
    }
}


SPAppWebUrl = decodeURIComponent(retrieveQueryStringParameter("SPAppWebUrl"));
SPHostUrl = decodeURIComponent(retrieveQueryStringParameter("SPHostUrl"));

//Get the ViewModel in during the document load so that all observable will be available for the Databindng 
$(document).ready(function () {
    getModel();

});

//Function to Instantiate the ViewModel
function getModel() {
    var vm = new crudViewModel();

    ko.applyBindings(vm);
    vm.getCategories();
}


//The View Model used for
//1. Defining the ListName
//2. Defining observables used for databinding with UI
//3. getCategories () => Make call to SharePoint List to Read Categories Data
//4. createCategory() => Define the Data object to be passed to SharePoint List to Add a new Record in it
//5. getCategoryById() => Retrieve a specific record from the SharePoint List based upon the Id
//6. updateCategory() => Update a specific Crecord retrived using getCategoryById() function
//7. deleteCategory() =>  Delete a specific Crecord retrived using getCategoryById() function
var crudViewModel = function () {
    var self = this;
    var listName = "CategoryList";

    self.Id = ko.observable();
    self.Title = ko.observable();
    self.CategoryName = ko.observable();

    self.Category = {
        Id: self.Id,
        Title: self.Title,
        CategoryName:self.CategoryName
    };

    //self.url = SPAppWebUrl + "/_api/SP.AppContextSite(@target)" +
    //"/web/lists/getbytitle('" + listName + "')/items?" +
    //"@target='" + SPHostUrl + "'";

    self.Categories = ko.observableArray();
    self.error = ko.observable();

     
   //Function to Read all Categories 
  self.getCategories = function() {
        $.ajax({
            url: _spPageContextInfo.siteAbsoluteUrl + "/_api/web/lists/getbytitle('" + listName + "')/items",
            type: "GET",
            headers: { "Accept": "application/json;odata=verbose" }, // return data format
            success: function (data) {
                self.Categories(data.d.results);
            },
            error: function (data) {
                self.error("Error in processing request " + data.success);
            }
        });
    };

    //Function to Create  Category
  self.createCategory = function () {
        var itemType = "SP.Data.CategoryListListItem";
        var cat = {
            "__metadata": { "type": itemType },
            "Title": self.Title,
            "CategoryName": self.CategoryName
        };

        $.ajax({
            url: _spPageContextInfo.siteAbsoluteUrl + "/_api/web/lists/getbytitle('" + listName + "')/items",
            type: "POST",
            contentType: "application/json;odata=verbose",
            data: ko.toJSON(cat),
            headers: {
                "Accept": "application/json;odata=verbose", // return data format
                "X-RequestDigest": $("#__REQUESTDIGEST").val()
            },
            success: function (data) {
                self.error("New Category Created Successfully");
            },
            error: function (data) {
                self.error("Error in processing request " + data.status);
            }
        });
        self.getCategories();
    };

//Function to get Specific Category based upon Id
  function getCategoryById  (callback) {
      var id = self.Id();
    
    //  var url = SPAppWebUrl + "/_api/SP.AppContextSite(@target)" +
    //"/web/lists/getbytitle('" + listName + "')/items(" +id+ ")?" +
      //"@target='" + SPHostUrl + "'";

      var url = _spPageContextInfo.siteAbsoluteUrl + "/_api/web/lists/getbytitle('" + listName + "')/items(" + id + ")";


      $.ajax({
          url: url,
          type: "GET",
          headers: { "Accept": "application/json;odata=verbose" }, // return data format
          success: function (data) {
             // alert(JSON.stringify(data.d.__metadata.uri));
              //self.Title(data.d.Title);
              //self.CategoryName(data.d.CategoryName);
              callback(data);
          },
          error: function (data) {
              self.error("Error in processing request");
          }
      });

  };

    //Function to Update Category
  self.updateCategory = function () {

      getCategoryById(function (data) {
          var itemType = "SP.Data.CategoryListListItem";

          var cat = {
              "__metadata": { "type": itemType },
              "Title": self.Title,
              "CategoryName": self.CategoryName
          };

          $.ajax({
              url: data.d.__metadata.uri,
              type: "POST",
              contentType: "application/json;odata=verbose",
              data: ko.toJSON(cat),
              headers: {
                  "Accept": "application/json;odata=verbose", // return data format
                  "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                  "X-HTTP-Method": "MERGE",
                  "If-Match": data.d.__metadata.etag
              },
              success: function (data) {
                  self.error("Update Success");
              },
              error: function (data) {
                  self.error("Error in processing request " + data.status + "    " + data.statusCode);
              }
          });
      });

  };

//Function to Delete Category
  self.deleteCategory = function () {
        getCategoryById(function (data) {
            alert("Procssing DELETE");
            $.ajax({
                url: data.d.__metadata.uri,
                type: "POST",
                headers: {
                    "Accept": "application/json;odata=verbose",
                    "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                    "X-HTTP-Method": "DELETE",
                    "If-Match": data.d.__metadata.etag
                },
                success: function (data) {
                    self.error("DELETE Success");
                },
                error: function (data) {
                    self.error("Error in processing request " + data.status + "    " + data.statusCode + "Please try again");
                }
            });
        });
    };

    //Function to Select Category used for Update and Delete
    self.getSelectedCategory = function (cat) {
        self.Id(cat.Id);
        self.Title(cat.Title);
        self.CategoryName(cat.CategoryName);
    };

    //Function to clear all Textboxes
    self.clear = function () {
        alert("Clear");
        self.Id(0);
        self.Title("");
        self.CategoryName("");
    };

};


 



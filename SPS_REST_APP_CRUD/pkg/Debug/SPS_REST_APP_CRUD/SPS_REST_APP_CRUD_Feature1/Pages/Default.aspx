<%-- The following 4 lines are ASP.NET directives needed when using SharePoint components --%>

<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="~masterurl/default.master" Language="C#" %>

<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<%-- The markup and script in the following Content element will be placed in the <head> of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <script type="text/javascript" src="../Scripts/jquery-1.9.1.min.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.runtime.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.js"></script>
     <script src="../Scripts/knockout-3.1.0.js" type="text/javascript"></script>
        <!-- Add your JavaScript to the following file -->
     <script type="text/javascript" src="../Scripts/App.js"></script> 
    <meta name="WebPartPageExpansion" content="full" />

    <!-- Add your CSS styles to the following file -->
    <link rel="Stylesheet" type="text/css" href="../Content/App.css" />


</asp:Content>

<%-- The markup in the following Content element will be placed in the TitleArea of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server">
    Page Title
</asp:Content>

<%-- The markup and script in the following Content element will be placed in the <body> of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">

    <table id="tbl">
         <tr>
             <td>
                  <table>
                      <tr>
                          <td>Id</td>
                          <td>
                              <input type="text" id="txtid" data-bind="value: $root.Id"/>
                          </td>
                       </tr>
                      <tr> 
                          <td>CategoryId</td>
                          <td>
                              <input type="text" id="txtcatid" data-bind="value: $root.Title"/>
                          </td>
                    </tr>
                    <tr>
                          <td>CategoryName</td>
                          <td>
                              <input type="text" id="txtcatname" data-bind="value: $root.CategoryName"/>
                          </td>
                     </tr>
                     <tr>
                         <td>
                             <input type="button" id="btnnew" value="New" data-bind="click: $root.clear" />
                         </td>
                           <td>
                             <input type="button" id="btnsave" value="Save" data-bind="click: $root.createCategory"/>
                         </td>
                           <td>
                             <input type="button" id="btnupdate" value="Update"  data-bind="click: $root.updateCategory"/>
                         </td>
                     </tr>
                  </table>
             </td>
             <td>
              <div  class="Container">
                 <table class="table">
                     <thead>
                          <tr>
                               <th>Id</th><th>Category Id</th><th>Category Name</th>
                          </tr>
                     </thead>
                     <tbody data-bind="foreach: Categories">
                         <tr data-bind="click: $root.getSelectedCategory">
                             <td>
                                  <span data-bind="text:Id"></span>
                             </td>
                             <td>
                                  <span data-bind="text: Title"></span>
                             </td>
                             <td>
                                  <span data-bind="text: CategoryName"></span>
                             </td>
                              <td>
                                  <input type="button" value="Delete"  data-bind="click: $root.deleteCategory"/>
                             </td>
                         </tr>
                     </tbody>
                 </table>
                     </div>
             </td>
         </tr>
    </table>

    <div>
        <span data-bind="text:error"></span>
    </div>


     
   
</asp:Content>




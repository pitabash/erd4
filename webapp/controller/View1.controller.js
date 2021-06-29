sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
	"sap/ui/export/Spreadsheet",
    "sap/m/MessageToast",
    "sap/ui/core/util/ExportTypeCSV",
    "sap/m/MessageBox",
    "sap/ui/core/util/Export",
    "sap/ui/export/library"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller, JSONModel, Spreadsheet, MessageToast) {
		"use strict";
        var aData = []
        ;
		return Controller.extend("erd4.controller.View1", {
			onInit: function () {
               
            	this.localModel = new JSONModel();
                this.getView().setModel(this.localModel, "localModel");
            },
            createColumnConfig: function() {
			return [
				{
					label: 'Geo',
					property: 'Geo'
				},
				{
					label: 'PanelName',
					property: 'PanelName'
				},
				{
					label: 'EmailId',
					property: 'EmailId'
                },
                {
					label: 'Location',
					property: 'Location'
				},
				{
					label: 'Band',
					property: 'Band'
                },
                {
					label: 'Skills',
					property: 'Skills'
				},
				{
					label: 'Date',
					property: 'Date'
                },
                {
					label: 'Time',
					property: 'Time'
                }
            ];
        },

        // Function to validate name
        validateName : function(Name){
            var regEx = /^[a-zA-Z\s]*$/;
            if(Name.match(regEx))
                {
                return true;
                }
            else
                {
                return false;
                }
        },

        //Function to validate email
        validateEmail : function(Email){
            var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            if(Email.match(mailformat))
                {
                return true;
                }
            else
                {
                return false;
                }
        },

        // function for saving the data to table from form  
        onSave : function(){
                var oGeo = this.getView().byId("idGeo").getSelectedItem();
                var Geo;
                if (oGeo == null) {
                    alert("Please Select  Geo");
                    jQuery.sap.delayedCall(500, this, function() {

                     this.getView().byId("idGeo").focus();

                     });
                     
                    return;

                }else{
                    Geo = oGeo.getText();
                }

                var Name = this.getView().byId("idName").getValue();
                // Validating Name
                if (Name == "" ) {
                    alert("Please Enter Name");
                    //This is for focusing to the input field
                    jQuery.sap.delayedCall(500, this, function() {

                     this.getView().byId("idName").focus();

                     });
                    return;
                }
                if (!this.validateName(Name)) {
                    alert("Please enter letters only in Name Field");
                    jQuery.sap.delayedCall(500, this, function() {

                     this.getView().byId("idName").focus();

                     });
                    return;
                }
                
                var EmailId = this.getView().byId("idEmail").getValue();
                //Validating Email
                if (EmailId == "" ) {
                    alert("Please Enter Email");
                    jQuery.sap.delayedCall(500, this, function() {

                     this.getView().byId("idEmail").focus();

                     });
                    return;
                }
                if (!this.validateEmail(EmailId)) {
                    alert("You have entered an invalid email address!");
                    jQuery.sap.delayedCall(500, this, function() {

                     this.getView().byId("idEmail").focus();

                     });
                    return;
                }

                var Location = this.getView().byId("idLocation").getValue();
                //Validating Location
                if (Location == "" ) {
                    alert("Please Enter Location");
                    jQuery.sap.delayedCall(500, this, function() {

                     this.getView().byId("idLocation").focus();

                     });
                    return;
                }
                if (!this.validateName(Location)) {
                    alert("Please enter letters only in Location Field");
                    jQuery.sap.delayedCall(500, this, function() {

                     this.getView().byId("idLocation").focus();

                     });
                    return;
                }

                var oBand = this.getView().byId("idBand").getSelectedItem();
                //Validating Band
                var Band;
                if (oBand == null) {
                    alert("Please Select  Band");
                    jQuery.sap.delayedCall(500, this, function() {

                     this.getView().byId("idBand").focus();

                     });
                    return;

                }else{
                    Band = oBand.getText();
                }


                var oSkill = this.getView().byId("idSkill").getSelectedItem();
                //Validating Skill
                var Skill;
                if (oSkill == null) {
                    alert("Please Select Skill");
                    jQuery.sap.delayedCall(500, this, function() {

                     this.getView().byId("idSkill").focus();

                     });
                    return;

                }else{
                    Skill = oSkill.getText();
                }

                var oDate1 = this.getView().byId("idDate1").getDateValue() ;
                //Validating Date
                var Date1;
                if (oDate1 == null) {
                    alert("Please Select From Date");
                    jQuery.sap.delayedCall(500, this, function() {

                     this.getView().byId("idDate1").focus();

                     });
                    return;

                }else{
                    Date1 = oDate1.toString().slice(0,15);
                }


                var oDate2 = this.getView().byId("idDate2").getDateValue() ;
                 //Validating Date
                var Date2;
                if (oDate2 == null) {
                    alert("Please Select To Date");
                    jQuery.sap.delayedCall(500, this, function() {

                     this.getView().byId("idDate2").focus();

                     });
                    return;

                }else{
                    Date2 = oDate2.toString().slice(0,15);
                }


                var oTime1 = this.getView().byId("idTime1").getSelectedItem();
                 //Validating Time1
                var Time1;
                if (oTime1 == null) {
                    alert("Please Select From Time");
                    jQuery.sap.delayedCall(500, this, function() {

                     this.getView().byId("idTime1").focus();

                     });
                    return;

                }else{
                    Time1 = oTime1.getText();
                }


                var oTime2 = this.getView().byId("idTime2").getSelectedItem();
                 //Validating Time2
                var Time2;
                if (oTime2 == null) {
                    alert("Please Select To Time");
                    jQuery.sap.delayedCall(500, this, function() {

                     this.getView().byId("idTime2").focus();

                     });
                    return;

                }else{
                    Time2 = oTime2.getText();
                }
                
                var tempData = {"Geo": Geo,"PanelName": Name,"EmailId": EmailId,"Location": Location,"Band": Band,
                               "Skills": Skill,"Date": Date1+"-"+Date2,"Time": Time1+"-"+Time2};
            
                aData.push(tempData);

                this.localModel.setData( {"Referral" : aData });
                this.localModel.refresh(true);
                MessageToast.show("Data saved Succesfully in the Table");

           
        },
        // onSave:function(){
            
        //     this.getView().byId("idG").setText("Mantu");
        // },


        // Exporting the data from table to excel
		onExport: function() {


            // const binding = this.getView().byId("exportTable").getBinding("items");
            // new Spreadsheet({
            //     workbook:{
            //         columns: this.createColumnConfig()
            //     },
            //     dataSource: binding.getModel().getProperty(binding.getPath()),
            //     fileName: "data.xlsx",
            // }).build();




			var aCols, aProducts, oSettings, oSheet;

			aCols = this.createColumnConfig();
            // aProducts = this.getView().byId("exportTable").getModel().getProperty("/Referral");
            const binding = this.getView().byId("exportTable").getBinding("items");
            aProducts = binding.getModel().getProperty(binding.getPath());

            if( aProducts == undefined || aProducts.length == 0 )
            {
                alert("Table does not have any data");
                return;
            }
            
            debugger;
			oSettings = {
				workbook: { columns: aCols },
                dataSource: aProducts,
                fileName: "data.xlsx"
			};

			oSheet = new Spreadsheet(oSettings);
			oSheet.build()
				.then( function() {
					MessageToast.show("Spreadsheet export has finished");
				})
				.finally(oSheet.destroy);
        },

        //Clearing the input field
        onReset : function(){
                this.getView().byId("idGeo").setSelectedItem(null);
                this.getView().byId("idName").setValue("");
                this.getView().byId("idEmail").setValue("");
                this.getView().byId("idLocation").setValue("");
                 this.getView().byId("idBand").setSelectedItem(null);
                this.getView().byId("idSkill").setSelectedItem(null);
                this.getView().byId("idDate1").setValue("") ;
                this.getView().byId("idDate2").setValue("") ;
                this.getView().byId("idTime1").setSelectedItem(null);
                this.getView().byId("idTime2").setSelectedItem(null);
                MessageToast.show("Reset completed");
        },

        //Deleting the data from table
        
        onDelete : function(){

            if(aData.length == 0){
                MessageToast.show("Table is empty");
                return;
            }
            aData = [];
            this.localModel.setData( {"Referral" : aData });
            this.localModel.refresh(true);
            MessageToast.show("Table data has deleted");
        }
        
            

         });
        
	});

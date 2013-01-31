// Generated by CoffeeScript 1.4.0
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  if (!String.prototype.trim) {
    String.prototype.trim = function() {
      return this.replace(/^\s+|\s+$/g, "");
    };
  }

  jQuery(document).ready(function($) {
    var Valentyn;
    Valentyn = (function() {

      Valentyn.prototype.form = "  <form id=\"valentyn\">\n  <div style=\"float:left;\">\n    <div>\n      <p>Zadejte své <strong>zákaznické číslo</strong>:</p>\n      <input type=\"text\" name=\"number\" />\n      </div>\n      <div>\n      <p>Zadejte svou <strong>e-mailovou adresu</strong>:</p>\n      <input type=\"text\" name=\"email\" />\n      </div>\n\n  </div>\n  <div style=\"float:left;margin-left:60px\">\n    <div>\n      <p style=\"font-weight:bold;\">Soutěžní otázka:</p>\n      <p style=\"padding: 0 0 5px;\">Pokolikáté získal Provident 1. místo v indexu etického úvěrování?</p>\n\n      <div class=\"radio\">\n          <input type=\"radio\" name=\"index\" id=\"place-index-1\" value=\"1\" />\n        <label for=\"place-index-1\">po prvé</label>\n        </div><div class=\"radio\">\n        <input type=\"radio\" name=\"index\" id=\"place-index-2\" value=\"2\" />\n        <label for=\"place-index-2\">po druhé</label>\n        </div><div class=\"radio\">\n        <input type=\"radio\" name=\"index\" id=\"place-index-3\" value=\"3\" />\n        <label for=\"place-index-3\">po třetí</label>\n      </div>\n      <div style=\"padding:15px 0 0 0;clear:both;\">\n      <input id=\"place-marketing\" type=\"checkbox\" name=\"marketing\" value=\"1\" />\n      <label for=\"place-marketing\">Souhlasím s poskytnutím údajů pro marketingové účely</label>\n      </div>\n    </div>\n  </div>\n  <div class=\"form-button\">\n  <input type=\"submit\" value=\"Odeslat soutěž\" />\n  </div>\n</form>";

      Valentyn.prototype.image = "<img src='https://providentonline.cz/valentyn/provident-valentyn.jpg' width='560' height='259' style='float:right;margin:0 0 10px 40px' />";

      function Valentyn() {
        this.ajaxSuccess = __bind(this.ajaxSuccess, this);

        this.submit = __bind(this.submit, this);
        jQuery('head').append('<link rel="stylesheet" href="https://providentonline.cz/valentyn/style.css" type="text/css" />');
        $("#content .content p:lt(2)").css({
          "color": "red",
          "font-size": "22px",
          "font-weight": "normal"
        });
        $("#content .content").prepend($(this.image));
        $("#content .content p:last").css("text-align", "center");
        $("#content .content p:last").prepend(this.form);
        $("#content .content form").submit(this.submit);
      }

      Valentyn.prototype.submit = function() {
        var email, number, soutez;
        soutez = $("#valentyn input[name=index]:checked").val();
        email = $("#valentyn input[name=email]").val().trim();
        number = $("#valentyn input[name=number]").val().trim();
        if (!($("#valentyn input[type=checkbox]").is(":checked"))) {
          alert("Zaškrtněte prosím souhlas s poskytnutím údajů pro marketingové účely");
          return false;
        }
        if (soutez === void 0) {
          alert("Odpovězte prosím na soutěžní otázku");
          return false;
        }
        if (!this.validateCustomerEmail(email)) {
          alert("Zadejte prosím svůj platný e-mail. Musí být ve správném tvaru.");
          return false;
        }
        if (!this.validateNumber(number)) {
          alert("Zadejte prosím své zákaznické číslo. Musí ho tvořit pouze číslice.");
          return false;
        }
        $.ajax({
          "type": "POST",
          "url": "https://providentonline.cz/valentyn/valentyn.php",
          "data": $("#valentyn").serialize(),
          "success": this.ajaxSuccess,
          "crossDomain": true
        });
        return false;
      };

      Valentyn.prototype.ajaxSuccess = function() {
        $("#valentyn input[name=email]").val("");
        $("#valentyn input[name=number]").val("");
        $("#valentyn input[type=radio]").attr('checked', false);
        $("#valentyn input[type=checkbox]").attr('checked', false);
        return alert("Děkujeme a zařazujeme vás do soutěže.");
      };

      Valentyn.prototype.validateNumber = function(value) {
        var matches;
        matches = value.match(/^[0-9]+$/);
        return Boolean(matches);
      };

      Valentyn.prototype.validateCustomerEmail = function(value) {
        var matches;
        matches = value.match(/^\s*[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\s*$/i);
        return Boolean(matches);
      };

      return Valentyn;

    })();
    return new Valentyn();
  });

}).call(this);

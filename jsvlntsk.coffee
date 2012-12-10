unless String::trim then String::trim = -> @replace /^\s+|\s+$/g, ""

jQuery(document).ready(($) ->
  class Valentyn
    form: """
    <form id="valentyn">
    <div style="float:left;">
      <div>
        <p>Vaše <strong>číslo z karty splátok</strong> bez pomlčky:</p>
        <input type="text" name="number" />
        </div>
        <div>
        <p>Zadajte svoju <strong>e-mailovú adresu</strong>:</p>
        <input type="text" name="email" />
        </div>

    </div>
    <div style="float:left;margin-left:60px;width:480px;">
      <div>
        <p style="font-weight:bold;">Súťažná otázka:</p>
        <p style="padding: 0 0 5px;">Aká je maximálna ponúkaná suma spotrebiteľského úveru spoločnosti Provident Financial, s. r. o.?</p>

        <div class="radio">
            <input type="radio" name="index" id="place-index-1" value="1" />
          <label for="place-index-1">2 100 eur</label>
          </div><div class="radio">
          <input type="radio" name="index" id="place-index-2" value="2" />
          <label for="place-index-2">2 300 eur</label>
          </div><div class="radio">
          <input type="radio" name="index" id="place-index-3" value="3" />
          <label for="place-index-3">2 500 eur</label>
        </div>
        <div style="padding:15px 0 0 0;clear:both;">
        <input id="place-marketing" type="checkbox" name="marketing" value="1" />
        <label for="place-marketing">Súhlasím s poskytnutím údajov na marketingové účely</label>
        </div>
      </div>
    </div>
    <div class="form-button">
    <input type="submit" value="Odoslať súťaž" />
    </div>
  </form>
"""
    image: "<img src='https://providentonline.cz/valentyn/provident-valentyn-sk.jpg' width='560' height='259' style='float:right;margin:0 0 10px 40px' />"
    constructor: ->
      jQuery('head').append('<link rel="stylesheet" href="https://providentonline.cz/valentyn/style.css" type="text/css" />');
      $("#content .content p:lt(2)").css(
        "color": "red",
        "font-size": "22px",
        "font-weight": "normal"
      )
      $("#content .content").prepend($(@image))
      $("#content .content p:last").css("text-align", "center")
      $("#content .content p:last").prepend(@form)
      $("#content .content form").submit(this.submit)
    submit: =>
      soutez = $("#valentyn input[name=index]:checked").val()
      email = $("#valentyn input[name=email]").val().trim()
      number = $("#valentyn input[name=number]").val().trim()
      if not ($("#valentyn input[type=checkbox]").is(":checked"))
        alert("Zaškrtnite prosím súhlas s poskytnutím údajov na marketingové účely")
        return false
      if soutez == undefined
        alert("Odpovedzte prosím na súťažnú otázku")
        return false
      if not this.validateCustomerEmail(email)
        alert("Zadajte prosím svoj platný e-mail. Musí byť v správnom tvare.")
        return false
      if not this.validateNumber(number)
        alert("Zadajte prosím svoje číslo z karty splátok. Musí ho tvoriť iba číslice.")
        return false
      $.ajax({
        type: "GET",
        url: "http://providentvidea.cz/valentyn/valentyn-sk.php?"+Math.random()+"&"+$("#content form").serialize(),
        success: this.ajaxSuccess,
        error: this.ajaxError,
        dataType: "text"
      })
      return false
    ajaxError: (xhr, ajaxOptions, thrownError) =>
      console.log("HTTP " + xhr.status + ".\n" + thrownError);
    ajaxSuccess: =>
      # clear form
      $("#valentyn input[name=email]").val("")
      $("#valentyn input[name=number]").val("")
      $("#valentyn input[type=radio]").attr('checked', false)
      $("#valentyn input[type=checkbox]").attr('checked', false)
      alert("Ďakujeme a zaraďujeme vás do súťaže.")
    validateNumber: (value) ->
      matches = value.match(/^[0-9]+$/)
      return Boolean(matches)
    validateCustomerEmail: (value) ->
      matches = value.match(/^\s*[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\s*$/i)
      return Boolean(matches)

  new Valentyn()
)



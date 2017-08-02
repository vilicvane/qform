var qID = 0;
var finished = false;

var co = null;

var cp = 0;
var ct = "";
var sum = 0;
var ac = "";
var selected = false;
var shareText = '快分享给你的朋友吧!<br /><input id="share_text" type="text" value="啊啊啊, 果然是世界上最准的心理测试, 我完全折服了!!! http://j.mp/seatide" />';

window.onload = function () {
    var eles = document.all || document.getElementsByTagName("*");
    for (i in eles) {
        var ele = eles[i];
        if (ele.id)
            window[ele.id] = ele;
    }

    document.onkeypress = function (e) {
        e = e || window.event;
        if (e.keyCode == 13 && ok_button.parentNode)
            ok_button.click();
    };

    ok_button.onclick = function () {
        if (!co) return;
        sum += cp;
        ac += "\n" + qID + "." + qs[qID].q + "\n  " + co.o;
        cp = 0;
        qID = co.t;
        co = null;
        fillForm();
    };

    fillForm();
};

function removeButton() { button_holder.removeChild(ok_button); }

function fillForm() {
    var q = qs[qID];
    q_text.innerHTML = q.q;

    var nodes = q_options.childNodes;
    while (nodes[0])
        q_options.removeChild(nodes[0]);

    if (q.a) {
        var a = q.a;
        var name = "q_" + qID;
        for (var i = 0; i < a.length; i++) {
            void function (i) {
                var rd = document.createElement("input");
                rd.name = name;
                rd.type = "radio";
                rd.__option__ = a[i];

                rd.onchange = function () {
                    if (this.checked) {
                        co = this.__option__;
                        cp = a[i].p || 0;
                    }
                };

                var lb = document.createElement("label");
                lb.htmlFor = rd.id = name + "_" + i;
                lb.innerHTML = a[i].o;

                if (i) q_options.appendChild(document.createElement("br"));
                q_options.appendChild(rd);
                q_options.appendChild(lb);
            } (i);
        }
    }
    else if (q.f) {
        alert("得分:" + sum);
        return;

        q_options.innerHTML = "请填入你的邮箱, 测试结果将随后发送: <br />";

        var email = document.createElement("input");
        email.className = "email";

        q_options.appendChild(email);

        ok_button.onclick = function () {
            email.value = email.value.replace(/(^\s+|\s+$)/g, "");

            var re = /^[a-z0-9]+([\._-][a-z0-9]+)*@[a-z0-9]+([\.-][a-z0-9]+)*\.[a-z]{2,}$/i;
            if (!re.test(email.value)) {
                alert("请填入合法的邮箱!");
                email.focus();
                email.select();
                return;
            }

            var xhr;
            if (window.XMLHttpRequest)
                xhr = new XMLHttpRequest();
            else
                xhr = new ActiveXObject("MSXML2.XMLHTTP");

            xhr.open("post", "save.ashx", false);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send("sum=" + sum + "&email=" + email.value + "&ac=" + encodeURIComponent(ac));
            removeButton();
            q_options.innerHTML = "感谢您的参与!";
        };
    }
    else {
        q_options.innerHTML = shareText;
        removeButton();
    }

    var share_text = document.getElementById("share_text");
    if (share_text) share_text.onclick = function () { this.select(); };
}

function $(id) { return document.getElementById(id); }
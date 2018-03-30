function SiriPlayer() {
    var u = r("@marcom/ac-shader-player-2d").ShaderPlayer2D,
        p = r("./fragmentShader.js"),
        l = r("./white-fragmentShader.js"),
        q = r("@marcom/ac-object/defaults");

    var o = {
        antialias: false,
        mipmap: 1,
        alpha: false,
        transparent: false,
        fragmentShader: p,
        uniforms: {
            fw: { type: "float", value: 0 },
            fj: { type: "vec2", value: [0, 0] },
            ee: { type: "float", value: 1.5 },
            kq: { type: "float", value: 0 },
            et: { type: "float", value: 0.2 },
            dq: { type: "float", value: 1.5 },
            ww: { type: "float", value: 0.15 },
            qa: { type: "float", value: 0.5 },
            te: { type: "float", value: 0.05 },
            jf: { type: "vec2", value: [0, 0] },
            qd: { type: "vec2", value: [1, 1] }
        },
        sizes: { defaults: { width: 800, height: 180 } }
    };

    function t(a) {
        a = a || {};
        a.uniforms = q(o.uniforms, a.uniforms);
        a = q(o, a);
        if (a.white === true) {
            a.fragmentShader = l
        }
        u.call(this, a);
        this.setUniform("fj", this.getUniform("resolution"));
        this.on("update", this._updateChangedUniforms.bind(this))
    }
    var m = t.prototype = Object.create(u.prototype); m._updateChangedUniforms = function (d) {
        this.setUniform("fw", this.getUniform("time") / 1000);
        this.setUniform("fj", this.getUniform("resolution")); var b = this.getUniform("kq"), f = this.getUniform("ee"), c = (d.time - this.clock.lastFrameTime) / 1000;
        var a = b + (c * f); this.setUniform("kq", a)
    };
    s.exports = t
}

var Y = aa("@marcom/ac-siri-player").SiriPlayer;

N.createSiriPlayer = function () {
    var a = {
        alpha: true,
        transparent: true,
        white: false,
        sizes: {
            defaults: { width: 462, height: 106 },
            medium: { width: 462, height: 106 },
            small: { width: 320, height: 106 }
        }
    };
    this.siriPlayer = new Y(a);
    this.siriPlayer.setUniforms(ah.talkingStart.propsFrom);
    while (this.siriWaveEl.firstChild) {
        this.siriWaveEl.removeChild(this.siriWaveEl.firstChild)
    }
    this.siriWaveEl.appendChild(this.siriPlayer.el)
};
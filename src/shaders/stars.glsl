uniform float uTime;
uniform float uParticleCount;
uniform vec2 uResolution;

varying vec2 vUv;

float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

void main() {
    vec2 uv = vUv;
    float time = uTime * 0.001;
    
    // Create star field
    vec3 color = vec3(0.0);
    
    // Large stars
    for (float i = 0.0; i < 50.0; i++) {
        vec2 starPos = fract(sin(vec2(i * 12.9898, i * 78.233) + time * 0.01) * 43758.5453);
        float dist = length(uv - starPos);
        float size = 0.001 + hash(vec2(i, 1.0)) * 0.002;
        float brightness = hash(vec2(i, 2.0)) * 0.5 + 0.5;
        float twinkle = sin(time * 2.0 + i * 10.0) * 0.3 + 0.7;
        color += vec3(1.0, 0.95, 0.85) * brightness * twinkle * smoothstep(size, 0.0, dist);
    }
    
    // Medium stars
    for (float i = 0.0; i < 100.0; i++) {
        vec2 starPos = fract(sin(vec2(i * 15.123, i * 23.456) + time * 0.005) * 54321.123);
        float dist = length(uv - starPos);
        float size = 0.0005 + hash(vec2(i, 3.0)) * 0.001;
        float brightness = hash(vec2(i, 4.0)) * 0.3 + 0.2;
        color += vec3(1.0, 0.9, 0.8) * brightness * smoothstep(size, 0.0, dist);
    }
    
    // Tiny stars
    for (float i = 0.0; i < 200.0; i++) {
        vec2 starPos = fract(sin(vec2(i * 18.789, i * 31.415) + time * 0.002) * 98765.432);
        float dist = length(uv - starPos);
        float size = 0.0002;
        float brightness = hash(vec2(i, 5.0)) * 0.2 + 0.1;
        color += vec3(0.9, 0.85, 0.8) * brightness * smoothstep(size, 0.0, dist);
    }
    
    // Very subtle atmospheric glow
    float vignette = 1.0 - 0.3 * length(uv - 0.5);
    color *= vignette;
    
    // Fade near horizon
    float horizonFade = smoothstep(0.5, 0.65, uv.y);
    color *= horizonFade;
    
    gl_FragColor = vec4(color, 1.0);
    
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}
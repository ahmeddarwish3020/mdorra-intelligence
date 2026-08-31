uniform float uTime;
uniform vec2 uResolution;
uniform vec3 uCameraPos;
uniform vec3 uSunDirection;
uniform float uCloudOpacity;

varying vec3 vWorldPosition;
varying vec2 vUv;

#define OCTAVES 5

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

float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    
    for (int i = 0; i < OCTAVES; i++) {
        value += amplitude * noise(p * frequency);
        amplitude *= 0.5;
        frequency *= 2.0;
    }
    
    return value;
}

float layeredClouds(vec2 p, float time) {
    float clouds = 0.0;
    clouds += 0.5 * fbm(p * 0.5 + vec2(time * 0.003, time * 0.001));
    clouds += 0.3 * fbm(p * 1.2 + vec2(time * 0.005, -time * 0.002));
    clouds += 0.15 * fbm(p * 2.5 + vec2(-time * 0.008, time * 0.004));
    clouds += 0.05 * fbm(p * 5.0 + vec2(time * 0.012, time * 0.006));
    return clouds;
}

vec3 cloudColor(float density, float height, vec3 viewDir) {
    // Sun lighting
    float sunDot = max(dot(normalize(uSunDirection), viewDir), 0.0);
    
    // Cloud colors - warm architectural tones
    vec3 shadowColor = vec3(0.08, 0.07, 0.06);
    vec3 midColor = vec3(0.15, 0.13, 0.11);
    vec3 lightColor = vec3(0.25, 0.22, 0.18);
    vec3 highlightColor = vec3(0.4, 0.35, 0.28);
    vec3 goldRim = vec3(0.6, 0.5, 0.35);
    
    float shadow = smoothstep(0.0, 0.3, density);
    float mid = smoothstep(0.2, 0.6, density);
    float light = smoothstep(0.5, 0.85, density);
    float highlight = smoothstep(0.8, 1.0, density);
    
    vec3 color = mix(shadowColor, midColor, mid);
    color = mix(color, lightColor, light);
    color = mix(color, highlightColor, highlight * sunDot * 0.5);
    
    // Gold rim lighting on cloud edges
    float rim = pow(1.0 - max(dot(viewDir, normalize(uSunDirection)), 0.0), 3.0);
    color += goldRim * rim * density * 0.15;
    
    // Height-based color variation
    color *= mix(1.0, 0.7, smoothstep(0.0, 1.0, height));
    
    return color;
}

void main() {
    vec2 uv = vUv;
    vec3 viewDir = normalize(vWorldPosition - uCameraPos);
    
    // Multi-layer cloud rendering
    float time = uTime * 0.001;
    
    // Layer 1 - Base clouds
    float density1 = layeredClouds(uv * 6.0 + uCameraPos.xz * 0.008, time * 1000.0);
    
    // Layer 2 - Higher altitude clouds
    float density2 = layeredClouds(uv * 4.0 - uCameraPos.xz * 0.005, time * 800.0) * 0.6;
    
    // Layer 3 - Wispy high clouds
    float density3 = layeredClouds(uv * 10.0 + uCameraPos.xz * 0.012, time * 1200.0) * 0.3;
    
    float totalDensity = density1 + density2 + density3;
    totalDensity = smoothstep(0.15, 0.85, totalDensity);
    totalDensity *= uCloudOpacity;
    
    if (totalDensity < 0.02) {
        discard;
    }
    
    vec3 color = cloudColor(totalDensity, vWorldPosition.y, viewDir);
    
    // Atmospheric perspective
    float depth = length(vWorldPosition - uCameraPos) * 0.001;
    vec3 atmosphereColor = vec3(0.04, 0.035, 0.03);
    color = mix(color, atmosphereColor, 1.0 - exp(-depth * 0.3));
    
    // Subtle vignetting
    float vignette = 1.0 - 0.15 * length(uv - 0.5);
    color *= vignette;
    
    gl_FragColor = vec4(color, totalDensity);
    
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}
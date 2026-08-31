uniform float uTime;
uniform vec2 uResolution;
uniform vec3 uCameraPos;
uniform float uCloudSpeed;

varying vec3 vWorldPosition;
varying vec2 vUv;

#define OCTAVES 5
#define FBM_MAX 1.0
#define FBM_MIN 0.0

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
    
    // Base layer - large slow clouds
    clouds += 0.5 * fbm(p * 0.5 + vec2(time * 0.003, time * 0.001));
    
    // Mid layer - medium clouds
    clouds += 0.3 * fbm(p * 1.2 + vec2(time * 0.005, -time * 0.002));
    
    // Detail layer - small fast clouds
    clouds += 0.15 * fbm(p * 2.5 + vec2(-time * 0.008, time * 0.004));
    
    // Wispy layer
    clouds += 0.05 * fbm(p * 5.0 + vec2(time * 0.012, time * 0.006));
    
    return clouds;
}

void main() {
    vUv = uv;
    vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
    
    vec3 newPos = position;
    
    // Subtle vertex displacement for cloud volume
    float cloudDensity = layeredClouds(vUv * 8.0 + uCameraPos.xz * 0.01, uTime);
    newPos.z += cloudDensity * 2.0;
    
    gl_Position = projectionMatrix * viewMatrix * vec4(newPos, 1.0);
}
uniform float uTime;
uniform vec3 uCameraPos;
uniform float uLightingIntensity;
uniform vec3 uCursorWorldPos;
uniform float uCursorDistance;

varying vec3 vWorldPosition;
varying vec3 vNormal;
varying vec2 vUv;

vec3 architecturalMaterial(vec3 normal, vec3 viewDir, float lightingIntensity, float cursorInfluence) {
    // Base material colors - warm architectural tones
    vec3 baseColor = vec3(0.18, 0.16, 0.13);
    vec3 warmTone = vec3(0.25, 0.22, 0.18);
    vec3 goldAccent = vec3(0.5, 0.42, 0.28);
    vec3 highlight = vec3(0.65, 0.55, 0.35);
    
    // Sun direction
    vec3 sunDir = normalize(vec3(0.5, 0.8, 0.3));
    float sunDot = max(dot(normal, sunDir), 0.0);
    
    // Ambient occlusion approximation
    float ao = 0.5 + 0.5 * normal.y;
    
    // Base lighting
    vec3 color = baseColor * (0.3 + 0.4 * ao);
    color += warmTone * sunDot * 0.5 * lightingIntensity;
    
    // Cursor proximity lighting
    if (cursorInfluence > 0.0) {
        vec3 cursorDir = normalize(uCursorWorldPos - vWorldPosition);
        float cursorDot = max(dot(normal, cursorDir), 0.0);
        color += goldAccent * cursorDot * cursorInfluence * 0.6;
        color += highlight * pow(cursorDot, 8.0) * cursorInfluence * 0.4;
    }
    
    // Specular highlight
    vec3 viewDir = normalize(uCameraPos - vWorldPosition);
    vec3 halfDir = normalize(sunDir + viewDir);
    float spec = pow(max(dot(normal, halfDir), 0.0), 32.0);
    color += goldAccent * spec * 0.15 * lightingIntensity;
    
    // Interior glow through windows
    if (normal.y < -0.5) {
        color += vec3(0.4, 0.35, 0.25) * lightingIntensity * 0.3;
    }
    
    return color;
}

void main() {
    vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
    vNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
    vUv = uv;
    
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
}
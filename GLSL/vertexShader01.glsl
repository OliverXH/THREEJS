#version 300 es

layout(location = 0) in vec4 VertexPosition;
layout(location = 1) in vec4 VertexColor;

out vec4 Color;

uniform Transformation{
	mat4 ModelMatrix;
	mat4 ViewMatrix;
	mat4 ProjectionMatrix;
};

void main(){
	gl_Position = ProjectionMatrix * ViewMatrix * ModelMatrix * VertexPosition;
	Color = VertexColor;
}
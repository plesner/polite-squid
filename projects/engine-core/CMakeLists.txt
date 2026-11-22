cmake_minimum_required(VERSION 3.12)
set(CMAKE_VERBOSE_MAKEFILE ON)
project(posqui)
add_definitions(-std=c++17)
set (CMAKE_CXX_STANDARD 17)

file(GLOB_RECURSE ENGINE_SOURCES CONFIGURE_DEPENDS "${CMAKE_CURRENT_SOURCE_DIR}/src/*.cc")

if (DEFINED EMSCRIPTEN)
  project(emscripten_project)
  set(CMAKE_EXECUTABLE_SUFFIX ".mjs")
  add_executable(engine ${ENGINE_SOURCES})
  set_target_properties(engine PROPERTIES LINK_FLAGS "-lembind -og --emit-tsd engine.d.ts --no-entry")
else()
  add_library(engine SHARED ${ENGINE_SOURCES})
endif()

target_include_directories(engine PUBLIC "$ENV{FLATBUFS_ROOT}/include/")

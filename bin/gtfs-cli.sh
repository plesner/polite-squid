#!/bin/bash -e

cd projects/scala
sbt "run gtfs $(printf "%q " "$@")"

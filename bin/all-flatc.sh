set -e

FLATBUFS_ROOT="${FLATBUFS_ROOT:-/usr/bin}"

ALL_FILES="""
data/bundle.fbs
data/columns.fbs
data/protocol.fbs
data/stops.fbs
data/utils.fbs
"""

$FLATBUFS_ROOT/flatc -o projects/engine-core/src/gen/flatbuf --cpp $ALL_FILES

rm -rf projects/web/src/gen/flatbuf
$FLATBUFS_ROOT/flatc -o projects/web/src/gen/flatbuf --ts $ALL_FILES --gen-all

rm -rf projects/scala/src/main/java/
$FLATBUFS_ROOT/flatc -o projects/scala/src/main/java/ --java $ALL_FILES

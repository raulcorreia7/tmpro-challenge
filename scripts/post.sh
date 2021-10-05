#!/bin/bash

POSITIONAL=()

while [[ $# -gt 0 ]]; do
  key="$1"

  case $key in
    -u|--url)
      URL="$2"
      shift # past argument
      shift # past value
      ;;
    -m|--message)
      MESSAGE="$2"
      shift # past argument
      shift # past value
      ;;
    -t|--target)
      TARGET="$2"
      shift # past argument
      shift # past value
      ;;
    -d|--delivery)
      DELIVERY="$2"
      shift # past argument
      shift # past value
      ;;
    --default)
      DEFAULT=YES
      shift # past argument
      ;;
    *)    # unknown option
      POSITIONAL+=("$1") # save it in an array for later
      shift # past argument
      ;;
  esac
done

set -- "${POSITIONAL[@]}" # restore positional parameters

echo "URL           = ${URL}"
echo "MESSAGE       = ${MESSAGE}"
echo "DELIVERY      = ${DELIVERY}"
echo "TARGET        = ${TARGET}"
if [[ -n $1 ]]; then
    echo "Last line of file specified as non-opt/last argument:"
    tail -1 "$1"
fi

JSON="{ \"message\" : \"${MESSAGE}\", \"delivery\" : \"${DELIVERY}\", \"target\" : \"${TARGET}\" }"

echo "JSON : ${JSON}"
curl -XPOST -H "Content-type: application/json" -d "${JSON}" "${URL}"
from google.cloud import videointelligence
import asyncio
import multiprocessing
from itertools import product
from functools import partial
from google.protobuf.duration_pb2 import Duration
import dill

"""
Returns vision api results
"""
def detect_labels(video_client, file_handle, input_uri, l, t):
    EXCLUDE = ["nature", "aerial photography", "tree"]
    print("{} spawned".format(t))
    features = [videointelligence.Feature.LABEL_DETECTION]
    s = []
    for j in range(10):
        s.append(videointelligence.VideoSegment(start_time_offset=Duration(seconds=0+j*5+50*t), end_time_offset=Duration(seconds=(j+1)*5 + 50*t)))
        if (j+1)*5 + 50*t >= l:
            break

    print("{} {} segments: ".format(t, len(s)))

    operation = video_client.annotate_video(
        request={
            "features": features,
            "input_uri": input_uri,
            "video_context": videointelligence.VideoContext(segments=s)
        }
    )
    result = operation.result(timeout=120)

    print("\nFinished processing thread {}.".format(t))

    # segment_labels = result.annotation_results[0].segment_label_annotations

    for x in result.annotation_results:
        segment_labels = x.segment_label_annotations
        for i, segment_label in enumerate(segment_labels):
            if segment_label.entity.description in EXCLUDE:
                continue

            print("Video label description: {}".format(segment_label.entity.description))
            category_desc = ""
            for category_entity in segment_label.category_entities:
                print(
                    "\tLabel category description: {}".format(category_entity.description)
                )

            for i, segment in enumerate(segment_label.segments):
                start_time = (
                    segment.segment.start_time_offset.seconds
                    + segment.segment.start_time_offset.microseconds / 1e6
                )
                end_time = (
                    segment.segment.end_time_offset.seconds
                    + segment.segment.end_time_offset.microseconds / 1e6
                )
                # positions = "{}s to {}s".format(start_time, end_time)
                # confidence = segment.confidence
                # print("\tSegment {}: {}".format(i, positions))
                # print("\tConfidence: {}".format(confidence))

                file_handle.write("{},{},{},{}\n".format(segment_label.entity.description, str(start_time), str(end_time), str(segment.confidence)))

    return None

"""
Returns segments for a video length
""" 
def get_segments(video_length):
    segmentBatches = []
    for i in range(video_length // 10):
        segmentBatches.append([])
        for j in range(10):
            segmentBatches[i].append(videointelligence.VideoSegment(start_time_offset=Duration(seconds=0+j*5+50*i), end_time_offset=Duration(seconds=(j+1)*5 + 50*i)))
            if (j+1)*5 + 50*i >= video_length:
                return segmentBatches
        
    return segmentBatches

def main():
    # Initialize video ai client
    #video_uri = "gs://test-concrete-rig-265506/virat/09152008flight2tape3_1.mpg"
    video_client = videointelligence.VideoIntelligenceServiceClient()
    video_uri = "gs://test-concrete-rig-265506/virat/final_60032c127eda940069ff76ba_513160_Trim.mp4"
    video_length = 120

    segmentBatches = []
    file_handle = open('output', 'w+')
    for t in range(0, max(video_length // 100 + 1, video_length // 100)):
        detect_labels(video_client, file_handle, video_uri, video_length, t)
    file_handle.close()

    print("exit")

if __name__ == '__main__':
    main()
"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  MicIcon,
  MicOffIcon,
  VideoIcon,
  VideoOffIcon,
  PhoneOffIcon,
} from "lucide-react";

export default function VideoCallPage() {
  const params = useParams();
  const roomId = params.roomId as string;
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);

  useEffect(() => {
    startCall();
    return () => {
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
      }
      if (peerConnectionRef.current) {
        peerConnectionRef.current.close();
      }
    };
  }, []);

  const startCall = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setLocalStream(stream);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      const configuration: RTCConfiguration = {
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
      };
      const peerConnection = new RTCPeerConnection(configuration);
      peerConnectionRef.current = peerConnection;

      stream
        .getTracks()
        .forEach((track) => peerConnection.addTrack(track, stream));

      peerConnection.ontrack = (event) => {
        setRemoteStream(event.streams[0]);
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = event.streams[0];
        }
      };

      peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          // Send the candidate to the remote peer
          // You would typically send this over your signaling server
          console.log("New ICE candidate:", event.candidate);
        }
      };

      // Create and send offer
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);

      // Send the offer to the remote peer via your signaling server
      console.log("Offer created:", offer);

      // In a real application, you would listen for the answer from the remote peer
      // and call peerConnection.setRemoteDescription(answer)
    } catch (error) {
      console.error("Error starting the call:", error);
    }
  };

  const toggleMute = () => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
      audioTrack.enabled = !audioTrack.enabled;
      setIsMuted(!audioTrack.enabled);
    }
  };

  const toggleVideo = () => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      videoTrack.enabled = !videoTrack.enabled;
      setIsVideoOff(!videoTrack.enabled);
    }
  };

  const endCall = () => {
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
    }
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
    }
    // Redirect to a post-call page or back to the dashboard
    window.location.href = "/";
  };

  return (
    <div className="container mx-auto p-4 h-screen flex flex-col">
      <h1 className="text-2xl font-bold mb-4">Video Call - Room {roomId}</h1>
      <div className="flex-grow flex flex-col md:flex-row gap-4">
        <Card className="flex-1">
          <CardContent className="p-2">
            <video
              ref={localVideoRef}
              autoPlay
              muted
              playsInline
              className="w-full h-full object-cover rounded-lg"
            />
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardContent className="p-2">
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover rounded-lg"
            />
          </CardContent>
        </Card>
      </div>
      <div className="mt-4 flex justify-center space-x-4">
        <Button
          onClick={toggleMute}
          variant={isMuted ? "destructive" : "default"}
        >
          {isMuted ? <MicOffIcon /> : <MicIcon />}
        </Button>
        <Button
          onClick={toggleVideo}
          variant={isVideoOff ? "destructive" : "default"}
        >
          {isVideoOff ? <VideoOffIcon /> : <VideoIcon />}
        </Button>
        <Button onClick={endCall} variant="destructive">
          <PhoneOffIcon />
        </Button>
      </div>
    </div>
  );
}

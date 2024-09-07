const handleMeet = () => {
  const roomName = YourRoomName-${Date.now()};
  const jitsiURL = https://meet.jit.si/${roomName};
  window.open(jitsiURL, '_blank');
}


..\GoogleProtobuf\tools\protogen .\res\Networkmessage.proto --proto_path=.\
copy .\Networkmessage.cs ..\JangadaTileServer\JangadaTileServer\Network\Networkmessage.cs
del .\NetworkMessage.cs
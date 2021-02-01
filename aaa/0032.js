contract disassembler {

  function name() public return (var0,var1)
  {
      mstore(0x40,(0x20 + (0x80 + (0x20 * ((((sload(0x3) & ((((sload(0x3) & 0x1) == 0) * 0x100) + ~0x0)) / 0x2) + 0x1F) / 0x20)))));
      mstore(0x80,((sload(0x3) & ((((sload(0x3) & 0x1) == 0) * 0x100) + ~0x0)) / 0x2));
      var8 = ((sload(0x3) & ((((sload(0x3) & 0x1) == 0) * 0x100) + ~0x0)) / 0x2);
      if (((sload(0x3) & ((((sload(0x3) & 0x1) == 0) * 0x100) + ~0x0)) / 0x2)) 
      {
          if ((0x1F < var8)) 
          {
              temp0 = (0xA0 + var8);
              var6 = temp0;
              mstore(0x0,0x3);
              temp1 = keccak256(0x0,0x20);
              var8 = 0xA0;
              var7 = temp1;
label_0000046F:
              mstore(var8,sload(var7));
              var7 = (0x1 + var7);
              var8 = (0x20 + var8);
              if ((var6 > var8)) 
              {
                  goto label_0000046F;
              }
              else
              {
                  temp3 = (var6 + (0x1F & (var8 - var6)));
label_0000048C:
                  return(var0,var3);
              }
          }
          else
          {
              mstore(0xA0,((sload(0x3) / 0x100) * 0x100));
              goto label_0000048C;
          }
      }
      else
      {
          return(var0,0x80);
      }
  }

  function approve( address arg0,uint256 arg1) public return (var0)
  {
      var4 = func_00000890(msg.sender,arg0,arg1);
      return(0x1);
  }

  uint256 public totalSupply;

  function gasprice_bit_ether( int128 arg0) public return (var0)
  {
      var5 = func_0000097C(arg0,arg1,arg2);
      var9 = func_00000ABE(allowance[(arg0 & (SHL(0xA0,0x1) - 0x1))][msg.sender],arg2);
      var5 = func_00000890(arg0,msg.sender,var9);
      return(0x1);
  }

  uint8 public decimals;

  function increaseAllowance( address arg0,uint256 arg1) public return (var0)
  {
      var8 = func_00000B1B(allowance[msg.sender][(arg0 & (SHL(0xA0,0x1) - 0x1))],arg1);
      var4 = func_00000890(msg.sender,arg0,var8);
      return(0x1);
  }

  function mint( address arg0,uint256 arg1) public return ()
  {
      var2 = arg0;
      var3 = arg1;
      if ((msg.sender == ((SHL(0xA0,0x1) - 0x1) & (decimals / 0x100)))) 
      {
          var5 = func_00000B1B(totalSupply,arg1);
          if ((maxSupply > var5)) 
          {
              if (arg1) 
              {
label_000005E9:
                  var3 = func_00000B7C(var2,var3);
                  goto label_000005F2;
              }
              else
              {
label_000005F2:
                  return();
              }
          }
          else
          {
              var6 = func_00000B1B(totalSupply,arg1);
              var4 = func_00000ABE(var6,maxSupply);
              var3 = var4;
              if (var4) 
              {
                  goto label_000005E9;
              }
              else
              {
                  goto label_000005F2;
              }
          }
      }
      else
      {
          mstore(0x80,SHL(0xE5,0x461BCD));
          mstore(0x84,0x20);
          mstore(0xA4,0x30);
          callcodecopy(0xC4,0xD8B,0x30);
          revert(0x80,0x84);
      }
  }

  function operator() public return (var0)
  {
      return(((SHL(0xA0,0x1) - 0x1) & sload(0x6)));
  }

  function FUNC_62995D22( uint256 arg0) public return ()
  {
      if ((msg.sender == ((SHL(0xA0,0x1) - 0x1) & sload(0x6)))) 
      {
          require((arg0 & (SHL(0xA0,0x1) - 0x1)));
          decimals = ((decimals & ~(SHL(0xA8,0x1) - 0x100)) | (0x100 * (arg0 & (SHL(0xA0,0x1) - 0x1))));
          return();
      }
      else
      {
          mstore(0x80,SHL(0xE5,0x461BCD));
          mstore(0x84,0x20);
          mstore(0xA4,0x25);
          callcodecopy(0xC4,0xE25,0x25);
          revert(0x80,0x84);
      }
  }

  mapping(address => uint256) public balanceOf

  function symbol() public return (var0,var1)
  {
      mstore(0x40,(0x20 + (0x80 + (0x20 * ((((sload(0x4) & ((((sload(0x4) & 0x1) == 0) * 0x100) + ~0x0)) / 0x2) + 0x1F) / 0x20)))));
      mstore(0x80,((sload(0x4) & ((((sload(0x4) & 0x1) == 0) * 0x100) + ~0x0)) / 0x2));
      var8 = ((sload(0x4) & ((((sload(0x4) & 0x1) == 0) * 0x100) + ~0x0)) / 0x2);
      if (((sload(0x4) & ((((sload(0x4) & 0x1) == 0) * 0x100) + ~0x0)) / 0x2)) 
      {
          if ((0x1F < var8)) 
          {
              temp25 = (0xA0 + var8);
              var6 = temp25;
              mstore(0x0,0x4);
              temp26 = keccak256(0x0,0x20);
              var8 = 0xA0;
              var7 = temp26;
label_0000046F:
              mstore(var8,sload(var7));
              var7 = (0x1 + var7);
              var8 = (0x20 + var8);
              if ((var6 > var8)) 
              {
                  goto label_0000046F;
              }
              else
              {
                  temp28 = (var6 + (0x1F & (var8 - var6)));
label_0000048C:
                  return(var0,var3);
              }
          }
          else
          {
              mstore(0xA0,((sload(0x4) / 0x100) * 0x100));
              goto label_0000048C;
          }
      }
      else
      {
          return(var0,0x80);
      }
  }

  function burn( address arg0,uint256 arg1) public return ()
  {
      var2 = arg0;
      var3 = arg1;
      if ((msg.sender == ((SHL(0xA0,0x1) - 0x1) & (decimals / 0x100)))) 
      {
          if ((arg1 < totalSupply)) 
          {
              if (arg1) 
              {
label_0000077B:
                  var5 = var2;
                  var6 = var3;
                  if ((var2 & (SHL(0xA0,0x1) - 0x1))) 
                  {
                      var7 = func_00000ABE(totalSupply,var6);
                      totalSupply = var7;
                      var7 = func_00000ABE(balanceOf[(var5 & (SHL(0xA0,0x1) - 0x1))],var6);
                      balanceOf[(var5 & (SHL(0xA0,0x1) - 0x1))] = var7;
                      mstore(0x80,var6);
                      log(0x80,0x20,0xDDF252AD1BE2C89B69C2B068FC378DAA952BA7F163C4A11628F55A4DF523B3EF,(var5 & (SHL(0xA0,0x1) - 0x1)),0x0);
                      goto label_000005F2;
                  }
                  else
                  {
                      mstore(0x80,SHL(0xE5,0x461BCD));
                      mstore(0x84,0x20);
                      mstore(0xA4,0x21);
                      callcodecopy(0xC4,0xDBB,0x21);
                      revert(0x80,0x84);
                  }
              }
              else
              {
label_000005F2:
                  return();
              }
          }
          else
          {
              var4 = func_00000ABE(arg1,totalSupply);
              var3 = var4;
              if (var4) 
              {
                  goto label_0000077B;
              }
              else
              {
                  goto label_000005F2;
              }
          }
      }
      else
      {
          mstore(0x80,SHL(0xE5,0x461BCD));
          mstore(0x84,0x20);
          mstore(0xA4,0x30);
          callcodecopy(0xC4,0xD8B,0x30);
          revert(0x80,0x84);
      }
  }

  function decreaseAllowance( address arg0,uint256 arg1) public return (var0)
  {
      var8 = func_00000ABE(allowance[msg.sender][(arg0 & (SHL(0xA0,0x1) - 0x1))],arg1);
      var4 = func_00000890(msg.sender,arg0,var8);
      return(0x1);
  }

  function FUNC_A6591CDF() public return (var0)
  {
      return(((SHL(0xA0,0x1) - 0x1) & (decimals / 0x100)));
  }

  function many_msg_babbage( bytes1 arg0) public return (var0)
  {
      var4 = func_0000097C(msg.sender,arg0,arg1);
      return(0x1);
  }

  function FUNC_AC7475ED( uint256 arg0) public return ()
  {
      if ((msg.sender == ((SHL(0xA0,0x1) - 0x1) & sload(0x6)))) 
      {
          require((arg0 & (SHL(0xA0,0x1) - 0x1)));
          sstore(0x6,(((SHL(0xA0,0x1) - 0x1) & arg0) | (~(SHL(0xA0,0x1) - 0x1) & sload(0x6))));
          return();
      }
      else
      {
          mstore(0x80,SHL(0xE5,0x461BCD));
          mstore(0x84,0x20);
          mstore(0xA4,0x25);
          callcodecopy(0xC4,0xE25,0x25);
          revert(0x80,0x84);
      }
  }

  uint256 public maxSupply;

  mapping(address => mapping(address => uint256)) public allowance

  function func_00000890( uint256 arg0,uint256 arg1,uint256 arg2) private return (var0)
  {
      if ((arg0 & (SHL(0xA0,0x1) - 0x1))) 
      {
          if ((arg1 & (SHL(0xA0,0x1) - 0x1))) 
          {
              allowance[(arg0 & (SHL(0xA0,0x1) - 0x1))][(arg1 & (SHL(0xA0,0x1) - 0x1))] = arg2;
              mstore(0x80,arg2);
              log(0x80,0x20,0x8C5BE1E5EBEC7D5BD14F71427D1E84F3DD0314C0F7B2291E5B200AC8C7C3B925,(arg0 & (SHL(0xA0,0x1) - 0x1)),(arg1 & (SHL(0xA0,0x1) - 0x1)));
              return(var4);
          }
          else
          {
              mstore(0x80,SHL(0xE5,0x461BCD));
              mstore(0x84,0x20);
              mstore(0xA4,0x22);
              callcodecopy(0xC4,0xD69,0x22);
              revert(0x80,0x84);
          }
      }
      else
      {
          mstore(0x80,SHL(0xE5,0x461BCD));
          mstore(0x84,0x20);
          mstore(0xA4,0x24);
          callcodecopy(0xC4,0xE01,0x24);
          revert(0x80,0x84);
      }
  }

  function func_0000097C( uint256 arg0,uint256 arg1,uint256 arg2) private return (var0)
  {
      if ((arg0 & (SHL(0xA0,0x1) - 0x1))) 
      {
          if ((arg1 & (SHL(0xA0,0x1) - 0x1))) 
          {
              var10 = func_00000ABE(balanceOf[(arg0 & (SHL(0xA0,0x1) - 0x1))],arg2);
              balanceOf[(arg0 & (SHL(0xA0,0x1) - 0x1))] = var10;
              var10 = func_00000B1B(balanceOf[(arg1 & (SHL(0xA0,0x1) - 0x1))],arg2);
              balanceOf[(arg1 & (SHL(0xA0,0x1) - 0x1))] = var10;
              mstore(0x80,arg2);
              log(0x80,0x20,0xDDF252AD1BE2C89B69C2B068FC378DAA952BA7F163C4A11628F55A4DF523B3EF,(arg0 & (SHL(0xA0,0x1) - 0x1)),(arg1 & (SHL(0xA0,0x1) - 0x1)));
              return(var5);
          }
          else
          {
              mstore(0x80,SHL(0xE5,0x461BCD));
              mstore(0x84,0x20);
              mstore(0xA4,0x23);
              callcodecopy(0xC4,0xD46,0x23);
              revert(0x80,0x84);
          }
      }
      else
      {
          mstore(0x80,SHL(0xE5,0x461BCD));
          mstore(0x84,0x20);
          mstore(0xA4,0x25);
          callcodecopy(0xC4,0xDDC,0x25);
          revert(0x80,0x84);
      }
  }

  function func_00000ABE( uint256 arg0,uint256 arg1) private return (var0)
  {
      if ((arg0 > arg1)) 
      {
          return((arg0 - arg1));
      }
      else
      {
          mstore(0x80,SHL(0xE5,0x461BCD));
          mstore(0x84,0x20);
          mstore(0xA4,0x1E);
          mstore(0xC4,0x536166654D6174683A207375627472616374696F6E206F766572666C6F770000);
          revert(0x80,0x64);
      }
  }

  function func_00000B1B( uint256 arg0,uint256 arg1) private return (var0)
  {
      var14 = (arg1 + arg0);
      if ((arg0 < (arg1 + arg0))) 
      {
          return(var14);
      }
      else
      {
          mstore(0x80,SHL(0xE5,0x461BCD));
          mstore(0x84,0x20);
          mstore(0xA4,0x1B);
          mstore(0xC4,0x536166654D6174683A206164646974696F6E206F766572666C6F770000000000);
          revert(0x80,0x64);
      }
  }

  function func_00000B7C( uint256 arg0,uint256 arg1) private return (var0)
  {
      if ((arg0 & (SHL(0xA0,0x1) - 0x1))) 
      {
          var7 = func_00000B1B(totalSupply,arg1);
          totalSupply = var7;
          var7 = func_00000B1B(balanceOf[(arg0 & (SHL(0xA0,0x1) - 0x1))],arg1);
          balanceOf[(arg0 & (SHL(0xA0,0x1) - 0x1))] = var7;
          mstore(0x80,arg1);
          log(0x80,0x20,0xDDF252AD1BE2C89B69C2B068FC378DAA952BA7F163C4A11628F55A4DF523B3EF,0x0,(arg0 & (SHL(0xA0,0x1) - 0x1)));
          return(var3);
      }
      else
      {
          mstore(0x80,SHL(0xE5,0x461BCD));
          mstore(0x84,0x20);
          mstore(0xA4,0x1F);
          mstore(0xC4,0x45524332303A206D696E7420746F20746865207A65726F206164647265737300);
          revert(0x80,0x64);
      }
  }

  function main() public return ()
  {
      mstore(0x40,0x80);
      var0 = msg.value;
      require(!msg.value);
      if ((msg.data.length < 0x4)) 
      {
label_00000116:
          revert(0x0,0x0);
      }
      else
      {
          var0 = SHR(0xE0,msg.data(0x0));
          if ((0x70A08231 > SHR(0xE0,msg.data(0x0)))) 
          {
              if ((0x313CE567 > var0)) 
              {

                  //ISSUE:COMMENT: Function name()
                  if ((0x6FDDE03 == var0)) 
                  {
                      (var0,var1) = name();
label_00000123:
                      temp4 = mload(0x40);
                      mstore(temp4,0x20);
                      temp5 = mload(var1);
                      mstore((temp4 + 0x20),temp5);
                      temp6 = mload(var1);
                      var4 = (temp4 + 0x40);
                      var6 = temp6;
                      var7 = temp6;
                      var8 = (temp4 + 0x40);
                      var9 = (var1 + 0x20);
                      var10 = 0x0;
label_00000145:
                      if ((var7 < var10)) 
                      {
                          var4 = (var6 + var4);
                          var5 = (0x1F & var6);
                          if ((0x1F & var6)) 
                          {
                              temp8 = mload((var4 - var5));
                              mstore((var4 - var5),(~(EXP(0x100,(0x20 - var5)) - 0x1) & temp8));
                              temp9 = (0x20 + (var4 - var5));
                              temp10 = mload(0x40);
                              RETURN(temp10,(temp9 - temp10));
                          }
                          else
                          {
                              temp7 = mload(0x40);
                              RETURN(temp7,(var4 - temp7));
                          }
                      }
                      else
                      {
                          temp11 = mload((var10 + var9));
                          mstore((var10 + var8),temp11);
                          var10 = (0x20 + var10);
                          goto label_00000145;
                      }
                  }

                  //ISSUE:COMMENT: Function approve()
                  else if ((0x95EA7B3 == var0)) 
                  {
                      require((0x40 < (msg.data.length - 0x4)));
                      var1 = approve((msg.data(0x4) & (SHL(0xA0,0x1) - 0x1)),msg.data(0x24));
label_000001C4:
                      mstore(0x80,var1);
                      RETURN(0x80,0x20);
                  }

                  //ISSUE:COMMENT: Function totalSupply()
                  else if ((0x18160DDD == var0)) 
                  {
                      var1 = totalSupply();
label_000001E0:
                      mstore(0x80,var1);
                      RETURN(0x80,0x20);
                  }

                  //ISSUE:COMMENT: Function gasprice_bit_ether()
                  else if ((0x23B872DD == var0)) 
                  {
                      require((0x60 < (msg.data.length - 0x4)));
                      var1 = gasprice_bit_ether(((SHL(0xA0,0x1) - 0x1) & msg.data(0x4)),((SHL(0xA0,0x1) - 0x1) & msg.data(0x24)),msg.data(0x44));
                      goto label_000001C4;
                  }
                  else
                  {
                      goto label_00000116;
                  }
              }

              //ISSUE:COMMENT: Function decimals()
              else if ((0x313CE567 == var0)) 
              {
                  var1 = decimals();
                  mstore(0x80,uint8(var1));
                  RETURN(0x80,0x20);
              }

              //ISSUE:COMMENT: Function increaseAllowance()
              else if ((0x39509351 == var0)) 
              {
                  require((0x40 < (msg.data.length - 0x4)));
                  var1 = increaseAllowance((msg.data(0x4) & (SHL(0xA0,0x1) - 0x1)),msg.data(0x24));
                  goto label_000001C4;
              }

              //ISSUE:COMMENT: Function mint()
              else if ((0x40C10F19 == var0)) 
              {
                  require((0x40 < (msg.data.length - 0x4)));
                  mint((msg.data(0x4) & (SHL(0xA0,0x1) - 0x1)),msg.data(0x24));
label_0000029E:
                  stop();
              }

              //ISSUE:COMMENT: Function operator()
              else if ((0x570CA735 == var0)) 
              {
                  var2 = operator();
label_000002A8:
                  mstore(0x80,(var2 & (SHL(0xA0,0x1) - 0x1)));
                  RETURN(0x80,0x20);
              }

              //ISSUE:COMMENT: Function FUNC_62995D22()
              else if ((0x62995D22 == var0)) 
              {
                  require((0x20 < (msg.data.length - 0x4)));
                  FUNC_62995D22(((SHL(0xA0,0x1) - 0x1) & msg.data(0x4)));
                  goto label_0000029E;
              }
              else
              {
                  goto label_00000116;
              }
          }
          else if ((0xA6591CDF > var0)) 
          {

              //ISSUE:COMMENT: Function balanceOf()
              if ((0x70A08231 == var0)) 
              {
                  require((0x20 < (msg.data.length - 0x4)));
                  var1 = balanceOf(((SHL(0xA0,0x1) - 0x1) & msg.data(0x4)));
                  goto label_000001E0;
              }

              //ISSUE:COMMENT: Function symbol()
              else if ((0x95D89B41 == var0)) 
              {
                  (var0,var1) = symbol();
                  goto label_00000123;
              }

              //ISSUE:COMMENT: Function burn()
              else if ((0x9DC29FAC == var0)) 
              {
                  require((0x40 < (msg.data.length - 0x4)));
                  burn((msg.data(0x4) & (SHL(0xA0,0x1) - 0x1)),msg.data(0x24));
                  goto label_0000029E;
              }

              //ISSUE:COMMENT: Function decreaseAllowance()
              else if ((0xA457C2D7 == var0)) 
              {
                  require((0x40 < (msg.data.length - 0x4)));
                  var1 = decreaseAllowance((msg.data(0x4) & (SHL(0xA0,0x1) - 0x1)),msg.data(0x24));
                  goto label_000001C4;
              }
              else
              {
                  goto label_00000116;
              }
          }

          //ISSUE:COMMENT: Function FUNC_A6591CDF()
          else if ((0xA6591CDF == var0)) 
          {
              var2 = FUNC_A6591CDF();
              goto label_000002A8;
          }

          //ISSUE:COMMENT: Function many_msg_babbage()
          else if ((0xA9059CBB == var0)) 
          {
              require((0x40 < (msg.data.length - 0x4)));
              var1 = many_msg_babbage((msg.data(0x4) & (SHL(0xA0,0x1) - 0x1)),msg.data(0x24));
              goto label_000001C4;
          }

          //ISSUE:COMMENT: Function FUNC_AC7475ED()
          else if ((0xAC7475ED == var0)) 
          {
              require((0x20 < (msg.data.length - 0x4)));
              FUNC_AC7475ED(((SHL(0xA0,0x1) - 0x1) & msg.data(0x4)));
              goto label_0000029E;
          }

          //ISSUE:COMMENT: Function maxSupply()
          else if ((0xD5ABEB01 == var0)) 
          {
              var1 = 0x1E0;
              var2 = maxSupply();
              goto label_000001E0;
          }

          //ISSUE:COMMENT: Function allowance()
          else if ((0xDD62ED3E == var0)) 
          {
              require((0x40 < (msg.data.length - 0x4)));
              var1 = allowance(((SHL(0xA0,0x1) - 0x1) & msg.data(0x4)),(msg.data(0x24) & (SHL(0xA0,0x1) - 0x1)));
              goto label_000001E0;
          }
          else
          {
              goto label_00000116;
          }
      }
  }

}

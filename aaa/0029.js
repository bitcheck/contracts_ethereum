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
label_0000053E:
              mstore(var8,sload(var7));
              var7 = (0x1 + var7);
              var8 = (0x20 + var8);
              if ((var6 > var8)) 
              {
                  goto label_0000053E;
              }
              else
              {
                  temp3 = (var6 + (0x1F & (var8 - var6)));
label_0000055B:
                  return(var0,var3);
              }
          }
          else
          {
              mstore(0xA0,((sload(0x3) / 0x100) * 0x100));
              goto label_0000055B;
          }
      }
      else
      {
          return(var0,0x80);
      }
  }

  function approve( address arg0,uint256 arg1) public return (var0)
  {
      var4 = func_00000A6D(msg.sender,arg0,arg1);
      return(0x1);
  }

  uint256 public totalSupply;

  function gasprice_bit_ether( int128 arg0) public return (var0)
  {
      var5 = func_00000BDA(arg0,arg1,arg2);
      var9 = func_00000D9E(allowance[uint160(arg0)][msg.sender],arg2);
      var5 = func_00000A6D(arg0,msg.sender,var9);
      return(0x1);
  }

  uint8 public decimals;

  function increaseAllowance( address arg0,uint256 arg1) public return (var0)
  {
      var8 = func_00000DFE(allowance[msg.sender][uint160(arg0)],arg1);
      var4 = func_00000A6D(msg.sender,arg0,var8);
      return(0x1);
  }

  function mint( address arg0,uint256 arg1) public return ()
  {
      var2 = arg0;
      var3 = arg1;
      if ((msg.sender == uint160((decimals / 0x100)))) 
      {
          var5 = func_00000DFE(totalSupply,arg1);
          if ((maxSupply > var5)) 
          {
              if ((0x0 > arg1)) 
              {
label_000006F1:
                  return();
              }
              else
              {
label_000006E8:
                  var3 = func_00000E62(var2,var3);
                  goto label_000006F1;
              }
          }
          else
          {
              var4 = func_00000D9E(maxSupply,totalSupply);
              var3 = var4;
              if ((0x0 > var4)) 
              {
                  goto label_000006F1;
              }
              else
              {
                  goto label_000006E8;
              }
          }
      }
      else
      {
          mstore(0x80,0x8C379A000000000000000000000000000000000000000000000000000000000);
          mstore(0x84,0x20);
          mstore(0xA4,0x30);
          mstore(0xC4,0x4F6E6C7920617574686F72697A656420636F6E74726163742063616E2063616C);
          mstore(0xE4,0x6C20746869732066756E6374696F6E2E00000000000000000000000000000000);
          revert(0x80,0x84);
      }
  }

  uint160 public operator;

  function FUNC_62995D22( uint256 arg0) public return ()
  {
      if ((msg.sender == uint160(operator))) 
      {
          require(uint160(arg0));
          decimals = ((decimals & ~0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF00) | (0x100 * uint160(arg0)));
          return();
      }
      else
      {
          mstore(0x80,0x8C379A000000000000000000000000000000000000000000000000000000000);
          mstore(0x84,0x20);
          mstore(0xA4,0x25);
          mstore(0xC4,0x4F6E6C79206F70657261746F722063616E2063616C6C20746869732066756E63);
          mstore(0xE4,0x74696F6E2E000000000000000000000000000000000000000000000000000000);
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
label_0000053E:
              mstore(var8,sload(var7));
              var7 = (0x1 + var7);
              var8 = (0x20 + var8);
              if ((var6 > var8)) 
              {
                  goto label_0000053E;
              }
              else
              {
                  temp28 = (var6 + (0x1F & (var8 - var6)));
label_0000055B:
                  return(var0,var3);
              }
          }
          else
          {
              mstore(0xA0,((sload(0x4) / 0x100) * 0x100));
              goto label_0000055B;
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
      if ((msg.sender == uint160((decimals / 0x100)))) 
      {
          if ((arg1 < totalSupply)) 
          {
              if ((0x0 > arg1)) 
              {
label_000006F1:
                  return();
              }
              else
              {
label_0000090A:
                  var5 = var2;
                  var6 = var3;
                  if (uint160(var2)) 
                  {
                      var7 = func_00000D9E(totalSupply,var6);
                      totalSupply = var7;
                      var7 = func_00000D9E(balanceOf[uint160(var5)],var6);
                      balanceOf[uint160(var5)] = var7;
                      mstore(0x80,var6);
                      log(0x80,0x20,0xDDF252AD1BE2C89B69C2B068FC378DAA952BA7F163C4A11628F55A4DF523B3EF,uint160(var5),0x0);
                      goto label_000006F1;
                  }
                  else
                  {
                      mstore(0x80,0x8C379A000000000000000000000000000000000000000000000000000000000);
                      mstore(0x84,0x20);
                      mstore(0xA4,0x21);
                      mstore(0xC4,0x45524332303A206275726E2066726F6D20746865207A65726F20616464726573);
                      mstore(0xE4,0x7300000000000000000000000000000000000000000000000000000000000000);
                      revert(0x80,0x84);
                  }
              }
          }
          else
          {
              var4 = func_00000D9E(arg1,totalSupply);
              var3 = var4;
              if ((0x0 > var4)) 
              {
                  goto label_000006F1;
              }
              else
              {
                  goto label_0000090A;
              }
          }
      }
      else
      {
          mstore(0x80,0x8C379A000000000000000000000000000000000000000000000000000000000);
          mstore(0x84,0x20);
          mstore(0xA4,0x30);
          mstore(0xC4,0x4F6E6C7920617574686F72697A656420636F6E74726163742063616E2063616C);
          mstore(0xE4,0x6C20746869732066756E6374696F6E2E00000000000000000000000000000000);
          revert(0x80,0x84);
      }
  }

  function decreaseAllowance( address arg0,uint256 arg1) public return (var0)
  {
      var8 = func_00000D9E(allowance[msg.sender][uint160(arg0)],arg1);
      var4 = func_00000A6D(msg.sender,arg0,var8);
      return(0x1);
  }

  function FUNC_A6591CDF() public return (var0)
  {
      return(uint160((decimals / 0x100)));
  }

  function many_msg_babbage( bytes1 arg0) public return (var0)
  {
      var4 = func_00000BDA(msg.sender,arg0,arg1);
      return(0x1);
  }

  function FUNC_AC7475ED( uint256 arg0) public return ()
  {
      if ((msg.sender == uint160(operator))) 
      {
          require(uint160(arg0));
          operator = uint160(arg0);
          return();
      }
      else
      {
          mstore(0x80,0x8C379A000000000000000000000000000000000000000000000000000000000);
          mstore(0x84,0x20);
          mstore(0xA4,0x25);
          mstore(0xC4,0x4F6E6C79206F70657261746F722063616E2063616C6C20746869732066756E63);
          mstore(0xE4,0x74696F6E2E000000000000000000000000000000000000000000000000000000);
          revert(0x80,0x84);
      }
  }

  uint256 public maxSupply;

  mapping(address => mapping(address => uint256)) public allowance

  function func_00000A6D( uint256 arg0,uint256 arg1,uint256 arg2) private return (var0)
  {
      if (uint160(arg0)) 
      {
          if (uint160(arg1)) 
          {
              allowance[uint160(arg0)][uint160(arg1)] = arg2;
              mstore(0x80,arg2);
              log(0x80,0x20,0x8C5BE1E5EBEC7D5BD14F71427D1E84F3DD0314C0F7B2291E5B200AC8C7C3B925,uint160(arg0),uint160(arg1));
              return(var4);
          }
          else
          {
              mstore(0x80,0x8C379A000000000000000000000000000000000000000000000000000000000);
              mstore(0x84,0x20);
              mstore(0xA4,0x22);
              mstore(0xC4,0x45524332303A20617070726F766520746F20746865207A65726F206164647265);
              mstore(0xE4,0x7373000000000000000000000000000000000000000000000000000000000000);
              revert(0x80,0x84);
          }
      }
      else
      {
          mstore(0x80,0x8C379A000000000000000000000000000000000000000000000000000000000);
          mstore(0x84,0x20);
          mstore(0xA4,0x24);
          mstore(0xC4,0x45524332303A20617070726F76652066726F6D20746865207A65726F20616464);
          mstore(0xE4,0x7265737300000000000000000000000000000000000000000000000000000000);
          revert(0x80,0x84);
      }
  }

  function func_00000BDA( uint256 arg0,uint256 arg1,uint256 arg2) private return (var0)
  {
      if (uint160(arg0)) 
      {
          if (uint160(arg1)) 
          {
              var10 = func_00000D9E(balanceOf[uint160(arg0)],arg2);
              balanceOf[uint160(arg0)] = var10;
              var10 = func_00000DFE(balanceOf[uint160(arg1)],arg2);
              balanceOf[uint160(arg1)] = var10;
              mstore(0x80,arg2);
              log(0x80,0x20,0xDDF252AD1BE2C89B69C2B068FC378DAA952BA7F163C4A11628F55A4DF523B3EF,uint160(arg0),uint160(arg1));
              return(var5);
          }
          else
          {
              mstore(0x80,0x8C379A000000000000000000000000000000000000000000000000000000000);
              mstore(0x84,0x20);
              mstore(0xA4,0x23);
              mstore(0xC4,0x45524332303A207472616E7366657220746F20746865207A65726F2061646472);
              mstore(0xE4,0x6573730000000000000000000000000000000000000000000000000000000000);
              revert(0x80,0x84);
          }
      }
      else
      {
          mstore(0x80,0x8C379A000000000000000000000000000000000000000000000000000000000);
          mstore(0x84,0x20);
          mstore(0xA4,0x25);
          mstore(0xC4,0x45524332303A207472616E736665722066726F6D20746865207A65726F206164);
          mstore(0xE4,0x6472657373000000000000000000000000000000000000000000000000000000);
          revert(0x80,0x84);
      }
  }

  function func_00000D9E( uint256 arg0,uint256 arg1) private return (var0)
  {
      if ((arg0 > arg1)) 
      {
          return((arg0 - arg1));
      }
      else
      {
          mstore(0x80,0x8C379A000000000000000000000000000000000000000000000000000000000);
          mstore(0x84,0x20);
          mstore(0xA4,0x1E);
          mstore(0xC4,0x536166654D6174683A207375627472616374696F6E206F766572666C6F770000);
          revert(0x80,0x64);
      }
  }

  function func_00000DFE( uint256 arg0,uint256 arg1) private return (var0)
  {
      var14 = (arg1 + arg0);
      if ((arg0 < (arg1 + arg0))) 
      {
          return(var14);
      }
      else
      {
          mstore(0x80,0x8C379A000000000000000000000000000000000000000000000000000000000);
          mstore(0x84,0x20);
          mstore(0xA4,0x1B);
          mstore(0xC4,0x536166654D6174683A206164646974696F6E206F766572666C6F770000000000);
          revert(0x80,0x64);
      }
  }

  function func_00000E62( uint256 arg0,uint256 arg1) private return (var0)
  {
      if (uint160(arg0)) 
      {
          var7 = func_00000DFE(totalSupply,arg1);
          totalSupply = var7;
          var7 = func_00000DFE(balanceOf[uint160(arg0)],arg1);
          balanceOf[uint160(arg0)] = var7;
          mstore(0x80,arg1);
          log(0x80,0x20,0xDDF252AD1BE2C89B69C2B068FC378DAA952BA7F163C4A11628F55A4DF523B3EF,0x0,uint160(arg0));
          return(var3);
      }
      else
      {
          mstore(0x80,0x8C379A000000000000000000000000000000000000000000000000000000000);
          mstore(0x84,0x20);
          mstore(0xA4,0x1F);
          mstore(0xC4,0x45524332303A206D696E7420746F20746865207A65726F206164647265737300);
          revert(0x80,0x64);
      }
  }

  function main() public return ()
  {
      mstore(0x40,0x80);
      if ((msg.data.length < 0x4)) 
      {
label_000000FB:
          revert(0x0,0x0);
      }

      //ISSUE:COMMENT: Function name()
      else if ((uint32((msg.data(0x0) / 0x100000000000000000000000000000000000000000000000000000000)) == 0x6FDDE03)) 
      {
          require(!msg.value);
          (var0,var1) = name();
label_00000115:
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
label_00000137:
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
              goto label_00000137;
          }
      }

      //ISSUE:COMMENT: Function approve()
      else if ((0x95EA7B3 == var0)) 
      {
          require(!msg.value);
          require((0x40 < (msg.data.length - 0x4)));
          var1 = approve(uint160(msg.data(0x4)),msg.data(0x24));
label_000001C3:
          mstore(0x80,var1);
          RETURN(0x80,0x20);
      }

      //ISSUE:COMMENT: Function totalSupply()
      else if ((0x18160DDD == var0)) 
      {
          require(!msg.value);
          var1 = totalSupply();
label_000001EC:
          mstore(0x80,var1);
          RETURN(0x80,0x20);
      }

      //ISSUE:COMMENT: Function gasprice_bit_ether()
      else if ((0x23B872DD == var0)) 
      {
          require(!msg.value);
          require((0x60 < (msg.data.length - 0x4)));
          var1 = gasprice_bit_ether(uint160(msg.data(0x4)),uint160(msg.data(0x24)),msg.data(0x44));
          goto label_000001C3;
      }

      //ISSUE:COMMENT: Function decimals()
      else if ((0x313CE567 == var0)) 
      {
          require(!msg.value);
          var1 = decimals();
          mstore(0x80,uint8(var1));
          RETURN(0x80,0x20);
      }

      //ISSUE:COMMENT: Function increaseAllowance()
      else if ((0x39509351 == var0)) 
      {
          require(!msg.value);
          require((0x40 < (msg.data.length - 0x4)));
          var1 = increaseAllowance(uint160(msg.data(0x4)),msg.data(0x24));
          goto label_000001C3;
      }

      //ISSUE:COMMENT: Function mint()
      else if ((0x40C10F19 == var0)) 
      {
          require(!msg.value);
          require((0x40 < (msg.data.length - 0x4)));
          mint(uint160(msg.data(0x4)),msg.data(0x24));
label_000002DE:
          stop();
      }

      //ISSUE:COMMENT: Function operator()
      else if ((0x570CA735 == var0)) 
      {
          require(!msg.value);
          var2 = operator();
label_000002F5:
          mstore(0x80,uint160(var2));
          RETURN(0x80,0x20);
      }

      //ISSUE:COMMENT: Function FUNC_62995D22()
      else if ((0x62995D22 == var0)) 
      {
          require(!msg.value);
          require((0x20 < (msg.data.length - 0x4)));
          FUNC_62995D22(uint160(msg.data(0x4)));
          goto label_000002DE;
      }

      //ISSUE:COMMENT: Function balanceOf()
      else if ((0x70A08231 == var0)) 
      {
          require(!msg.value);
          require((0x20 < (msg.data.length - 0x4)));
          var1 = balanceOf(uint160(msg.data(0x4)));
          goto label_000001EC;
      }

      //ISSUE:COMMENT: Function symbol()
      else if ((0x95D89B41 == var0)) 
      {
          require(!msg.value);
          (var0,var1) = symbol();
          goto label_00000115;
      }

      //ISSUE:COMMENT: Function burn()
      else if ((0x9DC29FAC == var0)) 
      {
          require(!msg.value);
          require((0x40 < (msg.data.length - 0x4)));
          burn(uint160(msg.data(0x4)),msg.data(0x24));
          goto label_000002DE;
      }

      //ISSUE:COMMENT: Function decreaseAllowance()
      else if ((0xA457C2D7 == var0)) 
      {
          require(!msg.value);
          require((0x40 < (msg.data.length - 0x4)));
          var1 = decreaseAllowance(uint160(msg.data(0x4)),msg.data(0x24));
          goto label_000001C3;
      }

      //ISSUE:COMMENT: Function FUNC_A6591CDF()
      else if ((0xA6591CDF == var0)) 
      {
          require(!msg.value);
          var2 = FUNC_A6591CDF();
          goto label_000002F5;
      }

      //ISSUE:COMMENT: Function many_msg_babbage()
      else if ((0xA9059CBB == var0)) 
      {
          require(!msg.value);
          require((0x40 < (msg.data.length - 0x4)));
          var1 = many_msg_babbage(uint160(msg.data(0x4)),msg.data(0x24));
          goto label_000001C3;
      }

      //ISSUE:COMMENT: Function FUNC_AC7475ED()
      else if ((0xAC7475ED == var0)) 
      {
          require(!msg.value);
          require((0x20 < (msg.data.length - 0x4)));
          FUNC_AC7475ED(uint160(msg.data(0x4)));
          goto label_000002DE;
      }

      //ISSUE:COMMENT: Function maxSupply()
      else if ((0xD5ABEB01 == var0)) 
      {
          require(!msg.value);
          var1 = 0x1EC;
          var2 = maxSupply();
          goto label_000001EC;
      }

      //ISSUE:COMMENT: Function allowance()
      else if ((0xDD62ED3E == var0)) 
      {
          require(!msg.value);
          require((0x40 < (msg.data.length - 0x4)));
          var1 = allowance(uint160(msg.data(0x4)),uint160(msg.data(0x24)));
          goto label_000001EC;
      }
      else
      {
          goto label_000000FB;
      }
  }

}

const functions = require("../js/utils");

describe("Base conversion", () => {
  it("hexToBinary - checks if the right value is returned ", () => {
    expect(functions.hexToBinary("abc")).toBe("1010 1011 1100 ");
  });

  it("hexToDecimal - checks if the right value is returned", () => {
    expect(functions.hexToDecimal("abcdef")).toBe(11259375);
  });
});

describe("Utils Functions", () => {
  it("getIpClass - checks the right class is returned", () => {
    expect(functions.getIpClass("01111")).toBe("A");
    expect(functions.getIpClass("10111")).toBe("B");
    expect(functions.getIpClass("11111")).toBe("C");
  });

  it("cleanString - checks the right string is returned", () => {
    expect(functions.cleanString("00-11-11")).toBe("001111");
    expect(functions.cleanString("00 11 11")).toBe("001111");
    expect(functions.cleanString("001111")).toBe("001111");
  });

  it("getNetworkID - checks the right network id is returned", () => {
    expect(functions.getNetworkID("aabbccdd", "B")).toBe("aabb");
    expect(functions.getNetworkID("87eeffab", "A")).toBe("87");
    expect(functions.getNetworkID("cedf8920", "C")).toBe("cedf89");
  });

  it("getHostID - checks the right host id is returned", () => {
    expect(functions.getHostID("aabbccdd", "B")).toBe("ccdd");
    expect(functions.getHostID("87eeffab", "A")).toBe("eeffab");
    expect(functions.getHostID("cedf8920", "C")).toBe("20");
  });
});

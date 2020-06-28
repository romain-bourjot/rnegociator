function versionToBuffer(version: string): number {
  const toSplit = version.startsWith('v') ? version.substring(1) : version;
  const split = toSplit.split('.');

  return Buffer.from([
    0,
    Number(split[0]) || 0,
    Number(split[1]) || 0,
    Number(split[2]) || 0,
  ]).readUInt32BE();
}

export function createNegociator<T>(versions: { [version: string]: T }, defaultVersion: T) {
  const index = Object.entries(versions)
    .map(([k, v]: [string, T]): { key: number, value: T} => ({ key: versionToBuffer(k), value: v }))
    .sort((a, b) => a.key - b.key);

  return (version: string): T => {
    const buffered = versionToBuffer(version);
    let found = defaultVersion;

    for (let i = 0; i < index.length && buffered >= index[i].key; i++) {
      found = index[i].value;
    }

    return found;
  };
}

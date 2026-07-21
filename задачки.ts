function zadacha(ransomNote: string, magazine: string) {
	if (magazine.length < ransomNote.length) {
		return false
	}
	for (const c of ransomNote) {
		if (!magazine.includes(c)) {
			return false
		} else {
			magazine = magazine.replace(c, '')
		}
	}
	return true
}

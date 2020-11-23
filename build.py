import hashlib

# if index doesn't change don't put a hash in it
files = [{'src':"style",'type':'css','hashedLocation':''},{'src':"router",'type':'js','hashedLocation':''},{'src':"app",'type':'js','hashedLocation':''},{'src':"index",'type':'html','hashedLocation':''}]

def changeFileName(file):
        return  file['hashedLocation'].join(code.split(file['src']+'.'+file['type'])) # we split code then rejoin it using the minified file names


# generate hashed names
for file in files:
  
        f = open(file['src']+'.min.'+file['type'], "r") # open project files 
        code = f.read() # read file code
        f.close()

        h = hashlib.sha256() # Construct a hash object using our selected hashing algorithm
        h.update(code.encode('utf-8')) # Update the hash using a bytes object
        fileHash = h.hexdigest() # Print the hash value as a hex string
        
        if file['src']!='index':
                file['hashedLocation'] = file['src'] + '-' + fileHash + '.min.' + file['type']

        else:
                file['hashedLocation'] = file['src'] + '.' + file['type']


        if  file['src']=='app':
                code=  changeFileName(files[1]) 

        elif file['src']=='index':
                #style.css
                code=  changeFileName(files[0])
                #router.js
                code=   changeFileName(files[1])
                #app.js
                code=   changeFileName(files[2])  

        newFile= open('./dist/' + file['hashedLocation'] ,"w+")
        newFile.write(code)
        newFile.close()




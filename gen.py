for i in range(1, 12):
    print """
.col-offset-%s-12 {
    margin-left: %.2f%%;
}""" % (i, (1/0.12 * i))
